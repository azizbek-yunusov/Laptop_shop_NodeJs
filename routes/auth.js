const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const router = Router();

router.get("/login", async (req, res) => {
  res.render("auth/login", {
    title: "Register",
    isLogin: true,
    error: req.flash("error"),
    loginError: req.flash("loginError"),
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const candidate = await User.findOne({ email });
    if (candidate) {
      const samePas = bcrypt.compare(password, candidate.password);
      if (samePas) {
        req.session.user = candidate;
        // isAuthenticated ixtiyoriy nom
        req.session.isAuthenticated = true;
        req.session.save((err) => {
          if (err) throw err;
          res.redirect("/");
        });
      }
    } else {
      req.flash("loginError", "Password wrong");
      res.redirect("/auth/login#login");
    }
  } catch (error) {
    req.flash("loginError", "This username does not found");
    console.log(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const candidate = await User.findOne({ email });
    // agar yangi userni email bazada mavjud bolsa yangi forma kirit
    if (candidate) {
      req.flash("error", "This email is already exist");
      res.redirect("/auth/login#register");
    } else {
      const hashPass = await bcrypt.hash(password, 10);
      const newUser = new User({
        email: email,
        password: hashPass,
        name: name,
        cart: { items: [] },
      });
      await newUser.save();
      res.redirect("/auth/login#login");
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy(() => {
    res.redirect("/auth/login#login");
  });
});

module.exports = router;
