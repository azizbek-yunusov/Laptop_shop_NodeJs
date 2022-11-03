const { Router } = require("express");
const authMiddleware = require("../middleware/auth");
const router = Router();
const Notebook = require("../models/notebook");

function mapCart(cart) {
  return cart.items.map((s) => ({
    ...s.notebookId._doc,
    id: s.notebookId.id,
    count: s.count,
  }));
}

function computePrice(notebooks) {
  return notebooks.reduce((total, notebook) => {
    return (total += notebook.price * notebook.count);
  }, 0);
}

router.post("/add", authMiddleware, async (req, res) => {
  const notebook = await Notebook.findById(req.body.id);
  await req.user.addToCart(notebook);
  res.redirect("/cart");
});
// delete order
router.delete("/remove/:id", authMiddleware, async (req, res) => {
  await req.user.removeFromCart(req.params.id);
  const user = await req.user.populate("cart.items.notebookId");
  const notebooks = mapCart(user.cart);
  const cart = {
    notebooks,
    price: computePrice(notebooks),
  };
  res.status(200).json(cart);
});

router.get("/", authMiddleware, async (req, res) => {
  const user = await req.user.populate("cart.items.notebookId");
  const notebooks = mapCart(user.cart);
  res.render("cart", {
    title: "Basket",
    isCart: true,
    notebooks: notebooks,
    price: computePrice(notebooks),
  });
});

module.exports = router;
