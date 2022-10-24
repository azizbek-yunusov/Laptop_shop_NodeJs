const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class Notebook {
  constructor(title, price, img) {
    this.id = uuidv4();
    this.title = title;
    this.price = price;
    this.img = img;
  }
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      img: this.img,
    };
  }
  // save method - saqlash
  async save() {
    const notebooks = await Notebook.getAll();
    notebooks.push(this.toJSON());
    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, "..", "data", "notebooks.json"),
        JSON.stringify(notebooks),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  // static function
  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "notebooks.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        }
      );
    });
  }
}

module.exports = Notebook;
