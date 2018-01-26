var Order = {
  totalPrice: 0,
  pizzas: [],

  setTotalPrice: function() {
    var totalPrice = 0;
    this.pizzas.forEach(function(pizza) {
      totalPrice += this.totalPrice;
    });
    this.totalPrice = totalPrice;
  },

  addPizza: function(pizza) {
    this.pizzas.push(pizza);
  },

  removePizza: function() {},

  reset: function() {
    this.totalPrice = 0;
    this.pizzas.splice(0, this.pizzas.length);
    Customer.reset();
  }
};

var Customer = {
  name: '',
  address: '',
  setName: function(name) {
    this.name = name;
  },
  setAddress: function(address) {
    this.address = address;
  }
};

function Pizza() {
  this.totalPrice = 0;
  this.toppings = [];
  this.base = undefined;
};

Pizza.prototype.addTopping = function(topping) {
  this.toppings.push(topping);
};

Pizza.prototype.removeTopping = function() {},

Pizza.prototype.setTotalPrice = function() {
  var totalPrice = 0;
  this.toppings.forEach(function(topping) {
    totalPrice += this.price;
  });
  this.totalPrice = totalPrice;
};

function Base(name, price) {
  this.name = name;
  this.price = price;
}

function Topping(name, price) {
  this.name = name;
  this.price = price;
};


$(document).ready(function() {

});
