// require mongoose adn connnect it to db
var mongoose = require('mongoose');
//establish schema
var productSchema = new mongoose.Schema({
	name: String,
	img: String, 
	description: String, 
	quantity: Number
})
//connnect your collection and model schemam
mongoose.model('Product', productSchema);