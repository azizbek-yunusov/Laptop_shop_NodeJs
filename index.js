const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const addRoutes = require("./routes/add")
const notebooksRoutes = require("./routes/notebooks")
const cartRoutes = require("./routes/cart")

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});
// Handlebars
app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

// fiylni static qilish
app.use(express.static("public"));

// forma bilan ishlash uchun yoziladi
app.use(express.urlencoded({extended: true}))
// Routes
app.use("/", homeRoutes);
app.use("/notebooks", notebooksRoutes)
app.use("/add", addRoutes)
app.use("/cart", cartRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server has been started on port ${PORT} http://localhost:${PORT} ...`
  );
});
