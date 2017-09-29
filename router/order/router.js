var express = require('express'),
    OrderMiddleware = express(),
    OrderRouter = express.Router(),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    OrderModel = require('../../model/order'),
    CustomerModel = require('../../model/customer'),
    ProductModel = require('../../model/product'),
    CourierModel = require('../../model/courier'),
    DateConverter = require('../../util/dateConverter');

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
*   This method adds a new order
*/
OrderRouter.post('/addOrder', function(req, res){
    var newOrder = new OrderModel;

    newOrder.orderDate = DateConverter(req.body.orderDate);
    newOrder.customer = req.body.customer;
    newOrder.paymentType = req.body.paymentType;
    newOrder.orderStatus = '0';
    newOrder.amount = req.body.amount;
    newOrder.paymentAmount = req.body.paymentAmount;
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
*   This method updates payment status of the selected Order
*/
OrderRouter.post('/updatePaymentStatus', function(req, res){
    let updatedOrder = {};

    if(req.body.paymentStatus !== ''){
        updatedOrder.paymentStatus = req.body.paymentStatus;
    }

    if(req.body.paymentAmount !== ''){
        updatedOrder.paymentAmount = req.body.paymentAmount;
    }

    OrderModel.update({_id : req.body._id}, {$set : updatedOrder}, function(err, order){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data:{status : 200}});
        }
    });
});


/*
*   This method updates order Status of the selected Order
*/
OrderRouter.post('/updateOrderStatus', function(req, res){
    let updatedOrder = {};

    if(req.body.orderStatus !== ''){
        updatedOrder.orderStatus = req.body.orderStatus;
    }

    OrderModel.update({_id : req.body._id}, {$set : updatedOrder}, function(err, order){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data:{status : 200}});
        }
    });
});


/*
*   This method updates the order as Cancelled
*/
OrderRouter.post('/cancelOrder', function(req, res){

    OrderModel.update({_id : req.body._id}, {$set : {'orderStatus' : '4'}}, function(err, order){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data:{status : 200}});
        }
    });
});


/*
*   This method updates the selcted order as complete
*/
OrderRouter.post('/completeOrder', function(req, res){
    OrderModel.update({_id : req.body._id}, {$set : {'orderStatus' : '3'}}, function(err, order){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data:{status : 200}});
        }
    });
});


/*
*   This method updates the order as added to shipment
*/
OrderRouter.post('/addToShipment', function(req, res){
    let updatedOrder = {};

    if(req.body.deliveryDate !== ''){
        updatedOrder.deliveryDate = DateConverter(req.body.deliveryDate);
    }

    if(req.body.courier !== ''){
        updatedOrder.courier = req.body.courier;
    }

    updatedOrder.orderStatus = '2';

    OrderModel.update({_id : req.body._id}, {$set : updatedOrder}, function(err, order){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            return res.json({data:{status : 200}});
        }
    });
});


/*
*   This method retrieves total orders count, current month order count and current month income
*/
OrderRouter.get('/getOrderCountAndIncome', function(req, res){
    let data = {};

    // Get total orders count
    OrderModel.count({}, function(err, count){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {
            data["totalCount"] = count;
        }
    });

    let incrementMonth = 1;

    let currentMonth = parseInt(new Date().getMonth());
    let currentYear = new Date().getFullYear();

    let startDate = new Date(currentYear, currentMonth, 1);
    let endDate = new Date(currentYear, currentMonth + 1, 2);

    OrderModel.find({orderDate : {"$gte" : startDate, "$lt" : endDate}}, function(err, order){
        if(err){
            console.log(err);
            return res.json({data:{status : 500}});
        }else {

            let count = 0;
            let amount = 0;
            for(let o of order){
                count++;
                amount += o.amount;
            }
            data["currentMonthOrder"] = count;
            data["currentMonthIncome"] = amount;
            return res.json({data:{status : 200, data}});
        }
    });
});

OrderMiddleware.use('/order', OrderRouter);

module.exports = OrderMiddleware;