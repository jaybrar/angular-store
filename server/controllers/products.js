//first we require mongoose
var mongoose = require("mongoose");
//next we load our model by name
var Product = mongoose.model('Product');
// create a controller object to export
module.exports = (function(){
	return{
		show: function(req, res) {
			Product.find({}, function(err, results){
				if(err){
					console.log(err)
				}else{
					res.json(results);
				}
			})
		},
		add: function(req, res){
			var product = new Product({name:req.body.name, img:req.body.img, 
				description:req.body.description, quantity:req.body.quantity});
			product.save(function(err){
				if(err){
					console.log("error adding product");
				}else {
					res.end();
				}
			})
		},
		remove: function(req, res){
			Product.remove({_id: req.body._id}, function(err, products){
				if(err){
					console.log("error deleting product");
				}else {
					res.end();
				}
			})
		}
	}
})();