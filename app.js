var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    connection = require('./connection');

var productMiddleware = require('./router/product/router');
var highlightMiddleware = require('./router/highlight/router')

app.use(bodyParser.json());

app.use('/', [productMiddleware, highlightMiddleware]);

module.exports = app;

