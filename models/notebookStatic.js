const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const path = require("path");

class Notebook {
  constructor(title, price, img, descr) {
    this.id = uuidv4();
    this.title = title;
    this.price = price;
    this.img = img;
    this.descr = descr;
  }
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      price: this.price,
      img: this.img,
      descr: this.descr,
    };
  }

  //! SERVERDAN ASINXRON KODLAR KELADIGANI UCHUN PROMISE ISHLATILANADI

  // static function "getAll"
  // barcha ma'lumotlarni oluvchi
  static getAll() {
    return new Promise((resolve, reject) => {
      // o'qish
      fs.readFile(
        path.join(__dirname, "..", "data", "notebooksData.json"),
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

  // save method
  // yangi notebook qo'shish uchun ishlatilanadi
  async save() {
    const notebooks = await Notebook.getAll();
    notebooks.push(this.toJSON());
    return new Promise((resolve, reject) => {
      // yozish
      fs.writeFile(
        path.join(__dirname, "..", "data", "notebooksData.json"),
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

  // biron noutbookga bosganda usha notebookni "id" si bo'yicha ma'lumotlarni olib beradi
  // "id"ni routes/notebook.js zapros "/:id" dan getById(req.params.id) olyapti
  static async getById(id) {
    // notebooksda barcha noutbukalar keladi
    const notebooks = await Notebook.getAll();
    // find oraqali taqqoslaydi yoki qidiradi shu kabi
    return notebooks.find((item) => item.id === id);
    
  }

  static async update(notebook) {
    // notebook - shu edit qilingan noutbuk object qaytaradi
    const notebooks = await Notebook.getAll();

    const idx = notebooks.findIndex((c) => c.id === notebook.id);
    // massiv qaytaradi
    notebooks[idx] = notebook;

    // bazaga yangi data jo'natishi uchun yoziladi
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
}

module.exports = Notebook;
