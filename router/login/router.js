var express = require('express'),
    LoginMiddleware = express(),
    LoginRouter = express.Router(),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    UserModel = require('../../model/user');


LoginRouter.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if((req.session.cookie._expires > (new Date())) && req.cookies['token']){
        return res.json({data: {status : 201}});  // already logged in
    } else {
        res.cookie("token", "", { expires: new Date() });
        next();
    }

});

LoginRouter.use(cookieParser());
LoginRouter.use(session({ secret: 'secretkey', cookie: { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))} })); // session secret


LoginRouter.post('/admin', function(req, res, next){

   var userName = req.body.email;
   var password = req.body.password;

   UserModel.findOne({email : userName, password : password}, function(err, user) {

        if(err) {
            console.log(err);
            return res.json({status:500});
        }else {
            if(user){
                if(user.customer.role === 'admin'){
                    var token = Math.random().toString() + "-" + user._id;
                    res.cookie('token',token, { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))});

                    return res.json({status: 200});
                }else {
                    return res.json({status: 202}); // Unauthorised error
                }

            }else {
                return res.json({status: 401}); // Credentials does not match
            }
        }
   })

});


LoginMiddleware.use('/user/login', LoginRouter);

module.exports = LoginMiddleware;