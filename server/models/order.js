// require mongoose adn connnect it to db
var mongoose = require('mongoose');
//establish schema
var orderSchema = new mongoose.Schema({
	customer: String,
	product: String,
	quantity: Number,
	orderDate: { type: Date, default: Date.now }
})
//connnect your collection and model schemam
mongoose.model('Order', orderSchema);