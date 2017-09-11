var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    connection = require('./connection');

var productMiddleware = require('./router/product/router');

app.use(bodyParser.json());

app.use('/', [productMiddleware]);

module.exports = app;

