const { Router } = require("express");
const router = Router();
const Cart = require("../models/cart");
const Notebook = require("../models/notebook");

router.post("/add", async (req, res) => {
  const notebook = await Notebook.getById(req.body.id);
  // add custom method
  // notebook models cartga ketti
  await Cart.add(notebook);
  res.redirect("/cart");
});

router.get("/", async (req, res) => {
  // fetch custom method
  const cart = await Cart.fetch();
  res.render("cart", {
    title: "Basket",
    cart,
    isCart: true,
    notebooks: cart.notebooks,
    price: cart.price,
  });
});

module.exports = router;
