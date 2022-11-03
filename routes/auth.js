const { Router } = require("express");
const User = require("../models/user");
const router = Router();

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Register",
    isLogin: true,
  });
});

router.post("/login", async (req, res) => {
  const user = await User.findById("63616427125c918a8e6077d8");
  req.session.user = user;
  // isAuthenticated ixtiyoriy nom
  req.session.isAuthenticated = true;
  req.session.save((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});

module.exports = router;
