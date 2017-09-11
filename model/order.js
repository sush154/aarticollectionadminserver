var mongoose = require('mongoose');

var orderSchema = require('../schema/order');

var orderModel = mongoose.model('order', orderSchema);

module.exports = orderModel;