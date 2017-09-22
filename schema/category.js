var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
    categoryName        :   String,
    parentCategory      :   String          // Dress Material and Saree
});

module.exports = CategorySchema;