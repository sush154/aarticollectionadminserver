var mongoose = require('mongoose');

var courierSchema = require('../schema/courier');

var courierModel = mongoose.model('courier', courierSchema);

module.exports = courierModel;