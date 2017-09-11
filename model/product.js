var mongoose = require('mongoose');

var productSchema = require('../schema/product');

var productModel = mongoose.model('product', productSchema);

module.exports = productModel;