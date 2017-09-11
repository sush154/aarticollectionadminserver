var mongoose = require('mongoose');
var sequenceGenrator = require('mongoose-sequence-plugin');

var orderSchema = mongoose.Schema({
    orderId     :   String,
	Date		:	Date,
	productIds	:	[{type: mongoose.Schema.Types.ObjectId, ref: 'product'}],
	totalPrice	:	String,
	customer	:	{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
	courier		:	{type: mongoose.Schema.Types.ObjectId, ref: 'courier'},
	delivery	:	{type: mongoose.Schema.Types.ObjectId, ref: 'delivery'}
});

orderSchema.plugin(sequenceGenrator,{
	field	: 	'orderId',
	startAt	:	'001',
	prefix	:	'O-'
});

module.exports = orderSchema;