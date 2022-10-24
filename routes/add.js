const { Router } = require("express");
const router = Router();
const Notebook = require("../models/notebook");

router.get("/", (req, res) => {
  res.render("add", { title: "Add Notebooks", isAdd: true });
});

router.post("/", async (req, res) => {
  // new notebook yangi constructor
  const notebook = new Notebook(req.body.title, req.body.price, req.body.img);
  await notebook.save();
  console.log(req.body);
  res.redirect("/notebooks");
});

module.exports = router;
