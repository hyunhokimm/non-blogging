const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.listen(port, function () {
  console.log(`Server OPEN: ${port}`);
});
