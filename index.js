const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.render("login.ejs");
});
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js")); // redirect bootstrap JS
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css")); // redirect CSS bootstrap

app.use("/static", express.static(__dirname + "/static"));
app.use("/public", express.static(__dirname + "/static"));

app.listen(port, function () {
  console.log(`Server OPEN: ${port}`);
});
