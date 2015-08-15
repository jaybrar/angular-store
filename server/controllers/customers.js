//first we require mongoose
var mongoose = require("mongoose");
//next we load our model by name
var Customer = mongoose.model('Customer');
// create a controller object to export
module.exports = (function(){
	return{
		show: function(req, res) {
			Customer.find({}, function(err, results){
				if(err){
					console.log(err)
				}else{
					res.json(results);
				}
			})
		},
		add: function(req, res){
			var customer = new Customer({name: req.body.name});
			customer.save(function(err){
				if(err){
					console.log("error adding customer");
				}else {
					res.end();
				}
			})
		},
		remove: function(req, res){
			Customer.remove({_id: req.body._id}, function(err, customers){
				if(err){
					console.log("error deleting customer");
				}else {
					res.end();
				}
			})
		}
	}
})();

