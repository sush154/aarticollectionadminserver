var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
    user    :   {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    rating  :   String
});

module.exports = reviewSchema;