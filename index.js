const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

console.log(__dirname)
app.use(express.static( 'static'))
app.use("/js", express.static(__dirname + "/node_modules/bootstrap/dist/js")); // redirect bootstrap JS
app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css")); // redirect CSS bootstrap


app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/join", (req, res) => {
  res.render("userCreate.ejs");
});

app.listen(port, function () {
  console.log(`Server OPEN: ${port}`)
})
