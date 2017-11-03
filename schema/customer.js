var mongoose = require('mongoose');


var CustomerSchema = mongoose.Schema({
    firstName       :   String,
    lastName        :   String,
    address         :   String,
    city            :   String,
    state           :   String,
    pincode         :   String,
    email           :   String,
    phoneNo         :   String,
    activationFlag  :   Boolean,
    role            :   String
});

module.exports = CustomerSchema;