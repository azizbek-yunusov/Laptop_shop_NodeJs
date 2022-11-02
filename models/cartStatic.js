const path = require("path");
const fs = require("fs");

const pathToDb = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "card.json"
);

class Cart {
  // add()
  // notebook rotes cartdan kelyapti
  static async add(notebook) {
    const cart = await Cart.fetch();

    const idx = cart.notebooks.findIndex((c) => c.id === notebook.id);
    const candidate = cart.notebooks[idx];
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
  static async remove(id) {
    const cart = await Cart.fetch();
    const idx = cart.notebooks.findIndex((i) => i.id === id);
    const notebook = cart.notebooks[idx];

    if (notebook.count === 1) {
      cart.notebooks = cart.notebooks.filter((i) => i.id !== id);
    } else {
      cart.notebooks[idx].count--;
    }

    cart.price -= notebook.price;
    
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
}

module.exports = Cart;
