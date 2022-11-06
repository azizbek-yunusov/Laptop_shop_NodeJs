const { Router } = require("express");
const authMiddleware = require("../middleware/auth");
const Notebook = require("../models/notebook");
const router = Router();

//! BARCHA NOTEBOOKLARNI OLISH "GET"
router.get("/", async (req, res) => {
  try {
    // notebooksda massiv qaytaradi
    // const notebooks = await Notebook.getAll();
    const notebooks = await Notebook.find().populate("userId", "email name");
    res.render("notebooks", {
      title: "Notebooks",
      isNotebooks: true,
      userId: req.user ? req.user._id.toString() : null,
      notebooks,
    });
  } catch (error) {
    console.log(error);
  }
});

//! NOTEBOOKNI "EDIT" QILISH
// edit bosilgandagi holat "GET"
router.get("/:id/edit", authMiddleware, async (req, res) => {
  if (!req.query.allow) {
    return res.redirect("/");
  }
  try {
    const editNotebook = await Notebook.findById(req.params.id);
    // if(notebook.userId.toString() !== req.user._id.toString()) {
    //   return res.redirect
    // }
    res.render("notebook-edit", {
      title: `Edit ${editNotebook.title}`,
      editNotebook,
    });
    // renderni ichidagi editNotebook edit formaga jo'natiladi
  } catch (error) {
    console.log(error);
  }
});

//! DELETE qilish

router.post("/remove", async (req, res) => {
  try {
    await Notebook.deleteOne({ _id: req.body.id });
    res.redirect("/notebooks");
  } catch (e) {
    console.log(e);
  }
});

// "ADD NOTEBOOKS" bosilgandagi jarayon "POST" o'zgartish
router.post("/edit", authMiddleware, async (req, res) => {
  // update() - models/notebook.js dan keladigan class method
  await Notebook.findByIdAndUpdate(req.body.id, req.body);
  res.redirect("/notebooks");
});

//! NOTEBOOK DETAIL
// "DETAIL" bosilgandan keyingi jarayon
router.get("/:id", async (req, res) => {
  // getById() - models/notebook.js dan keladigan class method
  // req.params.id tanlangan elementni "id"si u getById ga ketadi
  const notebookDetail = await Notebook.findById(req.params.id);
  res.render("notebook", {
    notebookDetail,
    layout: "detail",
    title: `Notebook ${notebookDetail.title}`,
  });
});

module.exports = router;
