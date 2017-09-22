var mongoose = require('mongoose');


var CustomerSchema = mongoose.Schema({
    firstName       :   String,
    lastName        :   String,
    address         :   String,
    city            :   String,
    state           :   String,
    pincode         :   String,
    email           :   String,
    password        :   String,
    activationFlag  :   Boolean
});

module.exports = CustomerSchema;