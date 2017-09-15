var mongoose = require('mongoose');

var categorySchema = require('../schema/highlight');

var categoryModel = mongoose.model('highlight', categorySchema);

module.exports = categoryModel;