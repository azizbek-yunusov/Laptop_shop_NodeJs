const { Router } = require("express");
const router = Router();
const Cart = require("../models/cart");
const Notebook = require("../models/notebook");

router.post("/add", async (req, res) => {
  const notebook = await Notebook.findById(req.body.id);
  await req.user.addToCart(notebook)
  res.redirect("/cart");
});
// delete order
router.delete("/remove/:id", async (req, res) => {
  const cart = await Cart.remove(req.params.id);
  res.status(200).send(cart);
});

router.get("/", async (req, res) => {
  // fetch custom method
  // const cart = await Cart.fetch();
  // res.render("cart", {
  //   title: "Basket",
  //   isCart: true,
  //   notebooks: cart.notebooks,
  //   price: cart.price,
  // });
  res.send("ok")
});

module.exports = router;
