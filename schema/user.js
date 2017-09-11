var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName   :   String,
    lastName    :   String,
    email       :   String,
    phoneNo     :   String,
    password    :   String,
    accountLock :   Boolean,
    role        :   String,
    address     :   String
});

module.exports = userSchema;