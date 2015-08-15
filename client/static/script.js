var myApp = angular.module("myApp", ['ngRoute','angularMoment']);
    //use the config method to set up routing
    myApp.config(function ($routeProvider){
      $routeProvider
      .when('/', {templateUrl:'partials/dashboard.html'})
      .when('/products', {templateUrl:'partials/products.html'})
      .when('/orders', {templateUrl:'partials/view1.html'})
      .when('/customers', {templateUrl:'partials/view2.html'})
      .when('/settings', {templateUrl:'partials/settings.html'})
      .otherwise({redirectTo:'/'});
    })
    // create the factory
    myApp.factory("customerFactory", function($http){
      var customers = [];
      var products = [];
      var orders = [];
      var factory = {};
      factory.getCustomers = function (callback){
        $http.get('/customers').success(function(results){
          customers = results;
          callback(customers);
        })
      }
      factory.getOrders = function(callback){
        $http.get('/orders').success(function(results){
          orders = results;
          callback(orders);
        })
      }
      factory.addOrder = function(order, callback){
        $http.post('/add_order', order).success(function(){
          callback(orders);
        })
      }
      factory.removeCustomer = function(customer, callback){
        $http.post('/remove', customer).success(function(){
          callback(customers);
        })
      }
      factory.addCustomer = function(customer, callback){
        console.log(customer);
       $http.post('/add', customer).success(function(){
        callback(customers);
        })
      }
      factory.getProducts = function(callback){
        $http.get('/products').success(function(results){
          products = results;
          callback(products);
        })
      }
      factory.addProduct = function(product, callback){
        $http.post('add_product', product).success(function(){
          callback(products);
        })
      }
      return factory;
    });
    // crate the customers controller and inject the factory into it
    myApp.controller('customersController', function ($scope, customerFactory){
      $scope.customers = [];
      customerFactory.getCustomers(function (data){
        $scope.customers = data;
      });
    $scope.addCustomer = function(){
      for(var i=0; i<$scope.customers.length;i++){
        if($scope.customers[i].name === $scope.newCustomer.name){
          alert("cannot duplicate customer");
          return;
        }
      }
      customerFactory.addCustomer($scope.newCustomer, function(){
        customerFactory.getCustomers(function(data){
          $scope.customers = data;
        });
        $scope.newCustomer = {};
      });
    }
      $scope.removeCustomer = function(customer){
        customerFactory.removeCustomer(customer, function(){
          customerFactory.getCustomers(function(data){
            $scope.customers = data;
          })
        });
      }
    })
    //end customers controller

    // crate the orders controller and inject the factory into it
    myApp.controller('ordersController', function ($scope, customerFactory){
      //get all the customers
      $scope.customers = [];
      customerFactory.getCustomers(function (data){
        $scope.customers = data;
      })
      //get all the orders
      $scope.orders = [];
      customerFactory.getOrders(function (data){
        $scope.orders = data;
      })
      //get all products
      $scope.products = [];
      customerFactory.getProducts(function (data){
        $scope.products = data;
      })
      //add new orders
      $scope.addOrder = function(){
        customerFactory.addOrder($scope.newOrder, function(){
         customerFactory.getOrders(function (data){
          $scope.orders = data;
        });
        $scope.newOrder = {};
        });
      }
      //pagination methods
      var pagesShown = 3;
      var pageSize = 1;
      $scope.paginationLimit = function(data) {
       return pageSize * pagesShown;
      };

      $scope.hasMoreOrdersToShow = function() {
       return pagesShown < ($scope.orders.length / pageSize);
       //returns false when pagesshown is greater than pages needed to show 
       //all items
      };
      $scope.hasMoreCustomersToShow = function() {
       return pagesShown < ($scope.customers.length / pageSize);
       //returns false when pagesshown is greater than pages needed to show 
       //all items
      };

      $scope.showMoreItems = function() {
       pagesShown = pagesShown + 1;       
      };
      //date method
      // $scope.timediff = function(start){
      //   end = Date();
      // return moment.utc(moment(end).diff(moment(start))).format("");
      // }
    })
    //end orders controller

    //create the products controller
    myApp.controller('productsController', function ($scope, customerFactory){
      $scope.products = [];
      //pagination methods
      var pagesShown = 3;
      var pageSize = 5;
      $scope.paginationLimit = function(data) {
       return pageSize * pagesShown;
      };

      $scope.hasMoreItemsToShow = function() {
       return pagesShown < ($scope.products.length / pageSize);
      };

      $scope.showMoreItems = function() {
       pagesShown = pagesShown + 1;       
      };
      customerFactory.getProducts(function (data){
        $scope.products = data;
      })
      $scope.addProduct = function(){
        customerFactory.addProduct($scope.newProduct, function(){
          customerFactory.getProducts(function (data){
            $scope.products = data;
          })
          $scope.newProduct = {};
        })
      }
    })
    //end products controller

    //dashboardController












