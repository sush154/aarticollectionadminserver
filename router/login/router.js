var express = require('express'),
	loginMiddleware = express(),
	loginRouter = express.Router(),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	session = require('express-session'),
	cookieParser = require('cookie-parser'),
	UserModel = require('../../model/user');

passport.serializeUser(function(user, done){

    if(user){
        done(null, user.id);
    }
});

passport.deserializeUser(function(id, done){

    UserModel.findById(id, function(err, user){
        if(user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })
});


passport.use('local-login', new LocalStrategy({
		usernameField : 'email',
	    passwordField : 'password',
        session: true
    },
    function(email, password, done){

        UserModel.findOne({email: email, password:password}, function(err, user){

            if(err){return done(err);}
            if(!user){
                return done(null, false, {message: "Incorrect username/password"});
            }
            return done(null,user);
        })
    }
));

loginRouter.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

loginRouter.use(cookieParser());
loginRouter.use(session({ secret: 'secretkey', cookie: { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))} })); // session secret
loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

loginRouter.post('', function(req, res, next){

	passport.authenticate('local-login', function(err, user, info){

        if(err){return res.json({status:500});}
        if(!user){console.log(user); return res.json({status: 401});}
        else{
        	var token = Math.random().toString() + "-" + user._id;
	        res.cookie('token',token, { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))});

	        return res.json({status: 200});
        }

   })(req, res, next);

});

loginMiddleware.use('/user/login', loginRouter);

module.exports = loginMiddleware;
