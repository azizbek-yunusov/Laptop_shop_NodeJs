const { Router } = require("express");
const authMiddleware = require("../middleware/auth")
const router = Router();
const Notebook = require("../models/notebook");

router.get("/", authMiddleware, (req, res) => {
  res.render("add", { title: "Add Notebooks", isAdd: true });
});

router.post("/", authMiddleware, async (req, res) => {
  // yangi noutbuk qo'shish
  const notebook = new Notebook({
    title: req.body.title,
    price: req.body.price,
    img: req.body.img,
    descr: req.body.descr,
    userId: req.user,
  });
  try {
    // save() - mongoDb dan keladigan method
    await notebook.save();
    res.redirect("/notebooks");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
