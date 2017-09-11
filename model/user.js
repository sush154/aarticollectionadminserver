var mongoose = require('mongoose');

var userSchema = require('../schema/user');

var userModel = mongoose.model('user', userSchema);

module.exports = userModel;