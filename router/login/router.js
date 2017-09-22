var express = require('express'),
    LoginMiddleware = express(),
    LoginRouter = express.Router(),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    CustomerModel = require('../../model/customer');


LoginRouter.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

LoginRouter.use(cookieParser());
LoginRouter.use(session({ secret: 'secretkey', cookie: { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))} })); // session secret


LoginRouter.post('', function(req, res, next){

   var userName = req.body.email;
   var password = req.body.password;

   CustomerModel.findOne({email : userName, password : password}, function(err, user) {

        if(err) {
            console.log(err);
            return res.json({status:500});
        }else {
            if(user){
                var token = Math.random().toString() + "-" + user._id;
                res.cookie('token',token, { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))});

                return res.json({status: 200});
            }else {
                return res.json({status: 401});
            }
        }
   })

});


LoginMiddleware.use('/user/login', LoginRouter);

module.exports = LoginMiddleware;