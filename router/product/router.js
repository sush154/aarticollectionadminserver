var express = require('express'),
    productMiddleware = express(),
    productRouter = express.Router(),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    productModel = require('../../model/product');

productRouter.use(cookieParser());
productRouter.use(session({ secret: 'secretkey', cookie: { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))} })); // session secret


productRouter.use(function(req, res, next){
	/*res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if((req.session.cookie._expires > (new Date())) && req.cookies['token']){
        next();
    } else {
        res.cookie("token", "", { expires: new Date() });
        return res.json({data: {status : 401}});
    }*/next();
});


/**
 * The method populates all the products for admin user
 */
productRouter.get('/getAllProducts', function(req, res, next){
    productModel.find({}).exec(function(err, product){
        if(err) return res.json({data:{status : 500}});
        return res.json({data: {status: 200, product}});
    });
});

/**
 * The method adds new product
 */
productRouter.post('/addProduct', function(req, res, next){
    var product = new productModel;

    
});

productMiddleware.use('/product', productRouter);

module.exports = productMiddleware;