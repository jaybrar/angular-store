//first we require mongoose
var mongoose = require("mongoose");
//next we load our model by name
var Order = mongoose.model('Order');
// create a controller object to export
module.exports = (function(){
	return{	
		show: function(req, res) {
			Order.find({}, function(err, results){
				if(err){
					console.log(err)
				}else{
					res.json(results);
				}
			})
		},
		add: function(req, res){
			var order = new Order({customer: req.body.customer, product: req.body.product, 
			quantity: req.body.quantity});
			order.save(function(err){
				if(err){
					console.log('error');
				}else{
					res.end();
				}
			})
		}
	}
})();