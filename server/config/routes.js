// notice how we set our customers.js controller as the variable customers? 
// that way we can access all of our methods from our routes!
var customers = require("../controllers/customers.js");
var orders = require("../controllers/orders.js");
var products = require("../controllers/products.js");
module.exports = function(app){
	//routes for customer model
	app.get('/customers', function(req, res) {
    	customers.show(req,res);
    });
    app.post('/add', function(req, res){
    	customers.add(req, res);
    })
    app.post('/remove', function(req, res){
    	customers.remove(req, res);
    })
    //routes for order model
    app.get('/orders', function(req, res) {
    	orders.show(req,res);
    });
    app.post('/add_order', function(req, res){
    	orders.add(req, res);
    })
    //routes for product model
    app.get('/products', function(req, res) {
        products.show(req,res);
    });
    app.post('/add_product', function(req, res){
        products.add(req, res);
    })

};
