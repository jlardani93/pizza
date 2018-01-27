var Order = {
  totalPrice: 0,
  pizzas: [],

  setTotalPrice: function() {
    var totalPrice = 0;
    this.pizzas.forEach(function(pizza) {
      totalPrice += pizza.totalPrice;
    });
    this.totalPrice = totalPrice;
  },

  addPizza: function(pizza) {
    this.pizzas.push(pizza);
  },

  removePizza: function(index) {
    this.pizzas.splice(index, index+1);
  },

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
  },
  sendPizzaForOrder: function() {
    Order.addPizza(this.pizza);
    this.pizza = undefined;
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
    var kitchenPizzaPrice = 0;
    if (Kitchen.pizza) {
    Kitchen.pizza.setTotalPrice();
    kitchenPizzaPrice = Kitchen.pizza.totalPrice;
    };
    var orderTotal = Order.totalPrice + kitchenPizzaPrice;
    $("#totalCost").text("Total Cost: $" + orderTotal);
    $("#pizzasOrdered").text("Pizzas Ordered: " + Order.pizzas.length);
  };

  var displayPizzas = function() {
    var index = 1
    Order.pizzas.forEach(function(pizza) {
      var cost = pizza.totalCost;
      var toppings = pizza.toppings;
      var base = pizza.base.name;
      var size = undefined;

      if (pizza.sizeCost === 0) {
        size = "small";
      } else if (pizza.sizeCost === 2) {
        size = "medium";
      } else {
        size = "large";
      };

      $("#pizzasContainer").append('<div class="col-md-4 pizzaColumn">' +
                                      '<div class="pizza">' +
                                        '<h3 class="pizzaNumber">Pizza Number: ' + index +
                                        '<p class="pizzaBase">Pizza Base: ' + base +
                                        '<p class="pizzaSize">Pizza Size: ' + size +
                                        '<ul class="toppingsList">Toppings</ul>' +
                                        '<button type="button" class="removePizza" value="' + index + '">Remove Pizza</button>' +
                                      '</div>' +
                                    '</div>');

      pizza.toppings.forEach(function(topping){
        $("#pizzasContainer .pizzaColumn:last-child").find(".pizza").find("ul").append('<li>' + topping.name + '</li>');
      });

      index++;

      $("#pizzasContainer .pizzaColumn:last-child").find(".pizza").find("button").click(function() {
        Order.removePizza($(this).val());
        updateOrder();
        $(this).parent().parent().parent().remove();
      });

    });
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
    $(this).parent().parent().parent().parent().toggleClass("hidden");
    $("#pizzaSizeRow").toggleClass("hidden");
    $("#cheeseAndTomatoSauce").toggleClass("hidden");
  });

  $("#noCheeseButton").click(function() {
    Kitchen.pizza.setBase(Kitchen.bases[1])
    $(this).parent().parent().parent().parent().toggleClass("hidden");
    $("#pizzaSizeRow").toggleClass("hidden");
    $("#onlyTomatoSauce").toggleClass("hidden");
  });

  $("#smallPizzaButton").click(function() {
    Kitchen.pizza.setSizeCost(0);
    $(this).parent().parent().parent().parent().toggleClass("hidden");
    $("#buildPizzaRow, #submitPizzaRow").toggleClass("hidden");
    updateOrder();
  });

  $("#mediumPizzaButton").click(function() {
    Kitchen.pizza.setSizeCost(2);
    $(this).parent().parent().parent().parent().toggleClass("hidden");
    $("#buildPizzaRow, #submitPizzaRow").toggleClass("hidden");
    updateOrder();
  });

  $("#largePizzaButton").click(function() {
    Kitchen.pizza.setSizeCost(4);
    $(this).parent().parent().parent().parent().toggleClass("hidden");
    $("#buildPizzaRow, #submitPizzaRow").toggleClass("hidden");
    updateOrder();
  });

  $(".topping").click(function() {
    var index = $(this).val();
    console.log($(this).val());
    var topping = Kitchen.getTopping(index);
    $("#img" + index).toggleClass("hidden");
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

  $("#submitPizza").click(function() {
    Kitchen.sendPizzaForOrder();
    $(this).parent().parent().toggleClass("hidden");
    $("#buildPizzaRow, #pizzaDisplayRow").toggleClass("hidden");
    $("#orderMorePizzaRow").toggleClass("hidden");
    $(".topping").removeClass("selected");
    $("#pizzaDisplayRow img").addClass("hidden");
    updateOrder();
  });

  $("#morePizza").click(function() {
    $(this).parent().parent().parent().parent().toggleClass("hidden");
    $("#pizzaBaseRow, #pizzaDisplayRow").toggleClass("hidden");
    Kitchen.pizza = new Pizza();
  });

  $("#addPizza").click(function() {
    $(this).parent().parent().parent().parent().toggleClass("hidden");
    $("#pizzaBaseRow, #pizzaDisplayRow").toggleClass("hidden");
    Kitchen.pizza = new Pizza();
  });

  $("#noMorePizza").click(function() {
    $(this).parent().parent().parent().parent().toggleClass("hidden");
    $("#orderConfirmationRow").toggleClass("hidden");
    displayPizzas();
  });

  $("#confirmOrder").click(function() {
    $(this).parent().parent().parent().parent().toggleClass("hidden");
  });


});
