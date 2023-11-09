const express = require("express");
const app = express();
const path = require("path");
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public/logo")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("user/login");
});

app.get("/create", (req, res) => {
  res.render("user/create");
});

app.get("/blog", (req, res) => {
  res.render("blog/blog");
});

app.get("/myinfo", (req, res) => {
  res.render("user/myInfo");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
