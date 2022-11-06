const { Router } = require("express");
const router = Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user._id }).populate(
      "user.userId"
    );
    res.render("orders", {
      isOrder: true,
      title: "Orders",
      orders: orders.map((s) => ({
        ...s._doc,
        price: s.notebooks.reduce((total, c) => {
          return (total += c.count * c.notebook.price);
        }, 0),
      })),
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.notebookId");
    const notebooks = user.cart.items.map((a) => ({
      count: a.count,
      notebook: { ...a.notebookId._doc },
    }));
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      notebooks,
    });
    await order.save();
    // console.log(order);
    await req.user.cleanCart();
    res.redirect("/orders");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
