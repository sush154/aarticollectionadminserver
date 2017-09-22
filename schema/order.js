var mongoose = require('mongoose');
var sequenceGenerator = require('mongoose-sequence-plugin');

var OrderSchema = mongoose.Schema({
    orderId         :   String,
    orderDate       :   Date,
    customer        :   {type: mongoose.Schema.Types.ObjectId, ref : 'customer'},
    paymentType     :   String,         // Cash(0), Online(1), Cheque(2)
    deliveryDate    :   Date,
    orderStatus     :   String,         // New(0), Pending(1), Shipped(2), Complete(3), Cancelled(4)
    amount          :   Number,
    products        :   [{type : mongoose.Schema.Types.ObjectId, ref : 'product'}],
    courier         :   {type : mongoose.Schema.Types.ObjectId, ref : 'courier'},
    paymentStatus   :   String,          // Awaiting payment(0), Partially Paid(1), Paid(2), Cancelled(3), Returned(4)
    orderType       :   String           // Online(0), On Call(1), Home Shopping(3)
});

OrderSchema.plugin(sequenceGenerator,{
	field	: 	'orderId',
	startAt	:	'001',
	prefix	:	'O-'
});
