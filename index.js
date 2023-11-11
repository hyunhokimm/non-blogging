const express = require("express");
const router = require("./routes");
const app = express();
const port = 3000;

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static( 'static'))
app.use('/',router)


app.get("/", (req, res) => {
  res.render("login.ejs");
});

app.get("/join", (req, res) => {
  res.render("signUp.ejs");
});

app.get("/blog", (req, res) => {
  res.render("blogging.ejs");
});

app.post("/post", (req, res) => {
  console.log(req.body.form)
});


app.get("/myblog", (req, res) => {
  res.render("myblog.ejs");
});

app.get("/allblog", (req, res) => {
  res.render("allblog.ejs");
});

app.listen(port, function () {
  console.log(`http://localhost:${port}`)
})
