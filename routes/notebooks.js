const {Router} = require("express")
const router = Router()

router.get("/", (req, res) => {
  res.render("notebooks", { title: "Notebooks", isNotebooks: true });
});

module.exports = router