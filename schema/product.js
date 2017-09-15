var mongoose = require('mongoose');
var sequenceGenrator = require('mongoose-sequence-plugin');

var productSchema = mongoose.Schema({
    productId   :   String,
    productName :   String,
    category    :   String,
    images      :   [{type: String, ref: 'images'}],
    rating      :   String,
    reviews     :   [{type: mongoose.Schema.Types.ObjectId, ref: 'review'}],
    price       :   String,
    discount    :   String,
    quantity    :   String,
    color       :   String,
    description :   String,
    highlights  :   [{type: mongoose.Schema.Types.Mixed, ref: 'highlights'}]
});

productSchema.plugin(sequenceGenrator,{
	field	: 	'productId',
	startAt	:	'001',
	prefix	:	'P-'
});

module.exports = productSchema;