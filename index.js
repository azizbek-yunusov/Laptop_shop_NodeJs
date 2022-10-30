const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add");
const notebooksRoutes = require("./routes/notebooks");
const cartRoutes = require("./routes/cart");

const User = require("./models/user");

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});
// Handlebars
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("635ea104dc891c05c2837639");
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
  }
});

// fiylni static qilish
app.use(express.static("public"));

// forma bilan ishlash uchun yoziladi
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/", homeRoutes);
app.use("/notebooks", notebooksRoutes);
app.use("/add", addRoutes);
app.use("/cart", cartRoutes);

async function start() {
  try {
    const url =
      "mongodb+srv://azizbekjon:BWfeAVxg7D4lV5tu@cluster0.q8rtgkp.mongodb.net/laptop-shop";
    await mongoose.connect(url, { useNewUrlParser: true });
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "azizbek@gmail.com",
        name: "Azizbek",
        cart: { items: [] },
      });
      await user.save();
    }

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(
        `Server has been started on port ${PORT} http://localhost:${PORT} ...`
      );
    });
  } catch (err) {
    console.log(err);
  }
}
// BWfeAVxg7D4lV5tu

start();
