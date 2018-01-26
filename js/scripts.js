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
  pizza: undefined,
  bases: [],
  toppings: [],
  addBase: function(base) {
    this.bases.push(base);
  },
  addTopping: function(topping) {
    this.toppings.push(topping);
  },
  getTopping: function(index) {
    return this.toppings[index];
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
  this.sizeCost = 0;
};

Pizza.prototype.setBase = function(base) {
  this.base = base;
};

Pizza.prototype.addTopping = function(topping) {
  this.toppings.push(topping);
};

Pizza.prototype.removeTopping = function(toppingToRemove) {
  var index = 0;
  this.toppings.forEach(function(topping) {
    if (toppingToRemove === topping) {
      Kitchen.pizza.toppings.splice(index, index+1)
    } else {
      index++;
    };
  });
};

Pizza.prototype.hasTopping = function(possibleTopping) {
  var hasTopping = false;
  this.toppings.forEach(function(topping) {
    if (possibleTopping === topping) {
      hasTopping = true;
      console.log(hasTopping);
    };
  });
  return hasTopping;
}

Pizza.prototype.setSizeCost = function(cost) {
  this.sizeCost = cost;
};

Pizza.prototype.setTotalPrice = function() {
  var totalPrice = this.base.price + this.sizeCost;
  this.toppings.forEach(function(topping) {
    totalPrice += topping.price;
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

  var updateOrder = function() {
    Order.setTotalPrice();
    Kitchen.pizza.setTotalPrice();
    var orderTotal = Order.totalPrice + Kitchen.pizza.totalPrice;
    $("#totalCost").text("Total Cost: $" + orderTotal);
    $("#pizzasOrdered").text("Pizzas Ordered: " + Order.pizzas.length);
  };

  stockKitchen();

  $("#placeAnOrder").click(function() {
    $(this).parent().parent().toggleClass("hidden");
    $("#formRow").toggleClass("hidden");
  });

  $("#form").submit(function(event) {
    event.preventDefault();
    Customer.setName($("#formName").val());
    Customer.setAddress($("#formAddress").val());
    $(this).parent().parent().toggleClass("hidden");
    $("#pizzaBuilderContainerRow").toggleClass("hidden");
    Kitchen.pizza = new Pizza();
  });

  $("#cheeseButton").click(function() {
    Kitchen.pizza.setBase(Kitchen.bases[0])
    $(this).parent().parent().toggleClass("hidden");
    $("#pizzaSizeRow").toggleClass("hidden");
  });

  $("#noCheeseButton").click(function() {
    Kitchen.pizza.setBase(Kitchen.bases[1])
    $(this).parent().parent().toggleClass("hidden");
    $("#pizzaSizeRow").toggleClass("hidden");
  });

  $("#smallPizzaButton").click(function() {
    Kitchen.pizza.setSizecost(0);
    $(this).parent().parent().toggleClass("hidden");
    $("#buildPizzaRow").toggleClass("hidden");
    updateOrder();
  });

  $("#mediumPizzaButton").click(function() {
    Kitchen.pizza.setSizeCost(2);
    $(this).parent().parent().toggleClass("hidden");
    $("#buildPizzaRow").toggleClass("hidden");
    updateOrder();
  });

  $("#largePizzaButton").click(function() {
    Kitchen.pizza.setSizeCost(4);
    $(this).parent().parent().toggleClass("hidden");
    $("#buildPizzaRow").toggleClass("hidden");
    updateOrder();
  });

  $(".topping").click(function() {
    var index = $(this).val();
    console.log($(this).val());
    var topping = Kitchen.getTopping(index);
    if (Kitchen.pizza.hasTopping(topping) === false) {
      Kitchen.pizza.addTopping(topping);
      updateOrder();
      console.log("added topping");
    } else {
      Kitchen.pizza.removeTopping(topping);
      updateOrder();
      console.log("removed topping");
    };
    $(this).toggleClass("selected");
  });







});
