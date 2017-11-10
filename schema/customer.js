var mongoose = require('mongoose');
var sequenceGenerator = require('mongoose-sequence-plugin');

var CustomerSchema = mongoose.Schema({
    customerId      :   String,
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

CustomerSchema.plugin(sequenceGenerator, {
    field    :   'customerId',
    startAt  :   '001',
    prefix   :   'C-'
});

module.exports = CustomerSchema;