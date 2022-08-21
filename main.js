class Product {
  constructor(name, price, measure, quantity = 0) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.measure = measure;
  }
  stockIncrease(number) {
    return (this.quantity += number);
  }
  stockDecrease(number) {
    return (this.quantity -= number);
  }
}

class ShoppingCart {
  constructor(productName, number = 1, user = "user") {
    this.products = [{ product: productName, quantity: number }];
    // this.total = this.products[0].quantity * this.products[0].product.price;
    productName.stockDecrease(number);
  }

  get total() {
    return this.calcTotal();
  }
  calcTotal() {
    // return this.products.reduce(
    //   (prev, curr) =>
    //     prev.quantity * prev.product.price + curr.quantity * curr.product.price,
    //   0
    // );
    let totalPrice = 0;
    for (let item of this.products) {
      totalPrice += item.quantity * item.product.price;
    }
    return totalPrice;
  }
  addProduct(newProduct, quantity) {
    if (newProduct.quantity >= quantity) {
      const index = this.products.findIndex(
        (el) => el.product.name === newProduct.name
      );

      if (index >= 0) {
        this.products[index].quantity += quantity;
      } else {
        this.products.push({ product: newProduct, quantity: quantity });
      }

      newProduct.stockDecrease(quantity);
    } else if (newProduct.quantity === 0) {
      console.log(
        `Sorry, it seems we've run out of stock with ${newProduct.name}`
      );
    } else {
      // if newProduct stock levels are below quantity but more than 0
      console.log(
        `Sorry, our stock levels for ${newProduct.name} is below ${quantity}. Adding ${newProduct.quantity} of ${newProduct.name} to the cart`
      );
      this.addProduct(newProduct, newProduct.quantity);
    }
  }
}

const apple = new Product("Apple", 4.95, "each", 20);
const orange = new Product("Orange", 3.99, "each", 100);

// apple.stockDecrease(12);
// console.log(apple.quantity);

let cart = new ShoppingCart(apple, 2);

cart.addProduct(apple, 20);
console.log(cart.products);
console.log(apple.quantity);

cart.addProduct(apple, 5);
console.log(cart.products);
console.log(apple.quantity);
// cart.addProduct(orange, 3);

// console.log(cart.total);

// console.log(orange.quantity);

// mocha tests demo

module.exports = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};

// integration tests
// app.js
const express = require("express");
const app = (module.exports = express());
// app.use(require('./lib/request-time'));
app.get("unix-timestamp", (req, res) => {
  res.json({
    timestamp: Math.floor(req.requestTime / 1000),
  });
});
if (require.main === module) {
  app.listen(3000, () => {
    console.log("Example app listening on port 3000");
  });
}
