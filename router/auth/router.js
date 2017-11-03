var express = require('express'),
    AuthMiddleware = express(),
    AuthRouter = express.Router(),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    UserModel = require('../../model/user');


AuthRouter.use(cookieParser());
AuthRouter.use(session({ secret: 'secretkey', cookie: { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))} })); // session secret

AuthRouter.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if((req.session.cookie._expires > (new Date())) && req.cookies['token']){
        return res.json({data: {status : 200}});
    } else {
        res.cookie("token", "", { expires: new Date() });
        return res.json({data: {status : 401}});
    }
});



AuthMiddleware.use('/user/auth', AuthRouter);

module.exports = AuthMiddleware;