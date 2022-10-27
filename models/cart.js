const path = require("path");
const fs = require("fs");

const pathToDb = path.join(__dirname, "..", "data", "cart.json");

class Cart {
  // add()
  // notebook rotes cartdan kelyapti
  static async add(notebook) {
    const cart = await Cart.fetch();

    const idx = cart.notebooks.findIndex((c) => c.id === notebook.id);
    const candidate = cart.notebooks[idx];
    console.log(candidate);
    if (candidate) {
      // buyni har bosganda qiymati 1 ga oshib boradi
      candidate.count++;
      cart.notebooks[idx] = candidate;
    } else {
      notebook.count = 1;
      cart.notebooks.push(notebook);
    }
    // + belgisi raqam qilib beradi
    cart.price += +notebook.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(pathToDb, JSON.stringify(cart), (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  // fetch()
  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(pathToDb, "utf-8", (err, content) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(content));
        }
      });
    });
  }
}

module.exports = Cart;
