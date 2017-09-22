var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    connection = require('./connection');

var LoginMiddleware = require('./router/login/router');
var CourierMiddleware = require('./router/courier/router');
var ReviewMiddleware = require('./router/review/router');
var CustomerMiddleware = require('./router/customer/router');
var ProductMiddleware = require('./router/product/router');
var CategoryMiddleware = require('./router/category/router');
var OrderMiddleware = require('./router/order/router');

app.use(bodyParser.json());

app.use('/', [LoginMiddleware, CourierMiddleware, ReviewMiddleware, CustomerMiddleware, ProductMiddleware,
                CategoryMiddleware, OrderMiddleware]);

module.exports = app;

