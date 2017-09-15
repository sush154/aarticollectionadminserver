var mongoose = require('mongoose');


var categorySchema = mongoose.Schema({
    name    :   String,
    value   :   String
});

module.exports = categorySchema;