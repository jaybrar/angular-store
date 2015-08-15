// require mongoose adn connnect it to db
var mongoose = require('mongoose');
//establish schema
var customerSchema = new mongoose.Schema({
	name: String,
	createdAt: { type: Date, default: Date.now }
})
//connnect your collection and model schemam
mongoose.model('Customer', customerSchema);