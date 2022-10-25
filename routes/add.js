const { Router } = require("express");
const router = Router();
const Notebook = require("../models/notebook");

router.get("/", (req, res) => {
  res.render("add", { title: "Add Notebooks", isAdd: true });
});

router.post("/", async (req, res) => {
  const notebook = new Notebook(
    req.body.title,
    req.body.price,
    req.body.img,
    req.body.descr
  );
  await notebook.save();
  res.redirect("/notebooks");
});

module.exports = router;
