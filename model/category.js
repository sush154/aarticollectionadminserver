var mongoose = require('mongoose');

var categorySchema = require('../schema/category');

var categoryModel = mongoose.model('category', categorySchema);

module.exports = categoryModel;