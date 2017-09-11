var mongoose = require('mongoose');
var sequenceGenrator = require('mongoose-sequence-plugin');

var productSchema = mongoose.Schema({
    productId   :   String,
    productName :   String,
    category    :   {type: mongoose.Schema.Types.ObjectId, ref: 'category'},
    images      :   [{type: String, ref: 'images'}],
    rating      :   String,
    reviews     :   [{type: mongoose.Schema.Types.ObjectId, ref: 'review'}],
    price       :   String,
    discount    :   String,
    quantity    :   String,
    color       :   String
});

productSchema.plugin(sequenceGenrator,{
	field	: 	'productId',
	startAt	:	'001',
	prefix	:	'O-'
});

module.exports = productSchema;