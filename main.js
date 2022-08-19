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

    // for (let item of this.products) {
    //   console.log(item.product.price); // 4.95
    // }
    // this.products.forEach((item) => console.log(item.product.price)); // 4.95
    // console.log(this.products);
    // -->
    // [
    //   {
    //     product: Product {
    //       name: 'Apple',
    //       price: 4.95,
    //       quantity: 8,
    //       measure: 'each'
    //     },
    //     quantity: 5
    //   }
    // ]
  }
  addProduct(newProduct, quantity) {
    const index = this.products.findIndex(
      (el) => el.product.name === newProduct.name
    );

    if (index >= 0) {
      this.products[index].quantity += quantity;
    } else {
      this.products.push({ product: newProduct, quantity: quantity });
    }

    newProduct.stockDecrease(quantity);
  }
}

const apple = new Product("Apple", 4.95, "each", 20);
const orange = new Product("Orange", 3.99, "each", 100);

// apple.stockDecrease(12);
console.log(apple.quantity);

let cart = new ShoppingCart(apple, 2);

cart.addProduct(apple, 3);
cart.addProduct(orange, 3);
// console.log(cart.products);

console.log(cart.total);

console.log(apple.quantity);
console.log(orange.quantity);
