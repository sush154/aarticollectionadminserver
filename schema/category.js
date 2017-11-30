var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
    categoryName        :   String,
    parentCategory      :   String          // Dress Material(1) and Saree(2)
});

module.exports = CategorySchema;