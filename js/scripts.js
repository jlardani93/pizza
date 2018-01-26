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

var Kitchen = {
  bases: [],
  toppings: [],
  addBase: function(base) {
    this.bases.push(base);
  },
  addTopping: function(topping) {
    this.toppings.push(topping);
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

var stockKitchen = function() {
  Kitchen.addBase(new Base("Cheese and Tomato Sauce", 6));
  Kitchen.addBase(new Base("Only Tomato Sauce", 4));
  Kitchen.addTopping(new Topping("Anchovies", 3));
  Kitchen.addTopping(new Topping("Broccoli", 2));
  Kitchen.addTopping(new Topping("Basil", 2));
  Kitchen.addTopping(new Topping("Cheese", 2));
  Kitchen.addTopping(new Topping("Ham", 2));
  Kitchen.addTopping(new Topping("Jalapenos", 1));
  Kitchen.addTopping(new Topping("Mushrooms", 1));
  Kitchen.addTopping(new Topping("Pineapple", 3));
};

$(document).ready(function() {

});
