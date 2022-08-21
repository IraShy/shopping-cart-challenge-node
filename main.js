// TODO: refactor so it's not a one-file app
// TODO: error handling

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
  // shopping cart created when a product is added to the cart
  constructor(productName, number = 1, user = "user") {
    this.products = [{ product: productName, quantity: number }];
    this.user = user;
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
    // if newProduct stock is greater than the quantity added in the cart

    // TODO: refactor: the if statement runs in every method
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

      // if newProduct is out of stock
    } else if (newProduct.quantity === 0) {
      console.log(
        `Sorry, it seems we've run out of stock with ${newProduct.name}`
      );

      // if newProduct stock levels are below quantity but more than 0
    } else {
      console.log(
        `Sorry, our stock levels for ${newProduct.name} is below ${quantity}. Adding ${newProduct.quantity} of ${newProduct.name} to the cart`
      );
      // recursively adding new product to cart, so no need to check whether the new product has been added to cart before
      this.addProduct(newProduct, newProduct.quantity);
    }
  }

  removeProduct(product) {
    const index = this.products.findIndex(
      (el) => el.product.name === product.name
    );

    if (index >= 0) {
      product.stockIncrease(this.products[index].quantity);

      this.products.splice(index, 1);
    } else {
      console.log("This product is not in cart");
    }
  }

  updateProduct(product, quantity) {
    const index = this.products.findIndex(
      (el) => el.product.name === product.name
    );

    if (index >= 0) {
      // if quantity is negative and its absolute value is equal to quantity of the product in cart: remove the product
      if (this.products[index].quantity === -1 * quantity) {
        this.removeProduct(product);
        // in all other cases, update the quantity with add: if quantity is negative, it will reduce the quantity in cart
      } else {
        this.addProduct(product, quantity);
      }
    } else {
      console.log("This product is not in cart");
    }
  }
}

const apple = new Product("Apple", 4.95, "each", 20);
const orange = new Product("Orange", 3.99, "each", 100);

let cart = new ShoppingCart(apple, 2);

cart.addProduct(apple, 15);
cart.updateProduct(apple, -10);
cart.removeProduct(apple);
cart.removeProduct(apple);

// console.log(cart.products);
console.log(apple.quantity);

// cart.removeProduct(apple);
// console.log(cart.products);
// console.log(apple.quantity);

cart.addProduct(orange, 3);
console.log(cart.products);

console.log(cart.total);

// console.log(orange.quantity);
