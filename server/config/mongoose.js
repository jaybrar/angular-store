// This is our mongoose.js file located in /config/mongoose.js
// This is a config file that connects to MongoDB and loads all of our models for us. We do this here because we don't want to have to connect to the DB every time we require a model!
var mongoose = require('mongoose');
//require file system
var fs = require('fs');
//connect to DB
mongoose.connect("mongodb://localhost/Customers_Orders");
//specify the path to all of the models
var models_path = __dirname + '/../models';
// read all of the files in the models_path and for each one check if it is a javascript file before requiring it
fs.readdirSync(models_path).forEach(function(file) {
  if(file.indexOf('.js') > 0) {
    require(models_path + '/' + file);
  }
})