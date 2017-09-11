var mongoose = require('mongoose');

var reviewSchema = require('../schema/review');

var reviewModel = mongoose.model('review', reviewSchema);

module.exports = reviewModel;