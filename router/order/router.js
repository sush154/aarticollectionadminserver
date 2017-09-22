var express = require('express'),
    OrderMiddleware = express(),
    OrderRouter = express.Router(),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    OrderModel = require('../../model/order'),
    CustomerModel = require('../../model/customer'),
    ProductModel = require('../../model/product'),
    CourierModel = require('../../model/courier');

OrderRouter.use(cookieParser());
OrderRouter.use(session({ secret: 'secretkey', cookie: { httpOnly: false,secure:false,expires: new Date(Date.now() + (1*24*60*60*1000))} })); // session secret

OrderRouter.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    /*if((req.session.cookie._expires > (new Date())) && req.cookies['token']){
        next();
    } else {
        res.cookie("token", "", { expires: new Date() });
        return res.json({data: {status : 401}});
    }*/next();
});


/*
*   This method retrieves all orders
*/
OrderRouter.get('/getAllOrders', function(req, res){
    OrderModel.find({}).populate('customer').select('orderId orderDate customer amount orderStatus').exec(function(err, order){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data: {status: 200, order}});
        }
    });
});


/*
*   This method retrieves orders from selected User
*/
OrderRouter.post('/getUserOrders', function(req, res){
    OrderModel.find({customer : req.body.customer}).populate('customer').select('orderId orderDate customer amount orderStatus').exec(function(err, order){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data: {status: 200, order}});
        }
    });
});


/*
*   This method adds a new order
*/
OrderRouter.post('/addOrder', function(req, res){
    var newOrder = new OrderModel;

    newOrder.orderDate = req.body.orderDate;
    newOrder.customer = req.body.customer;
    newOrder.paymentType = req.body.paymentType;
    newOrder.orderStatus = '0';
    newOrder.amount = req.body.amount;
    newOrder.courier = req.body.courier;
    newOrder.paymentStatus = req.body.paymentStatus;
    newOrder.orderType = req.body.orderType;

    for(let i=0; i < req.body.productIds.length; i++){
        newOrder.products.push(req.body.productIds[i]);
    }

    newOrder.save(function(err, order){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data:{status : 200}});
        }
    })
});

OrderMiddleware.use('/order', OrderRouter);

module.exports = OrderMiddleware;