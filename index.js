const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log(__dirname);
app.use(express.static("static"));
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js")); // redirect bootstrap JS
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css")); // redirect CSS bootstrap

app.get("/", (req, res) => {
  res.render("login.ejs");
});

//확인하려고 임시로 연결 > myblog.ejs
app.get("/myblog", (req, res) => {
  res.render("myblog.ejs");
});

//확인하려고 임시로 연결 > allblog.ejs
app.get("/allblog", (req, res) => {
  res.render("allblog.ejs");
});

app.get("/user/signup", (req, res) => {
  res.render("userCreate.ejs");
});

app.listen(port, function () {
  console.log(`Server OPEN: ${port}`);
});
