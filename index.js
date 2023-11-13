const express = require("express");
const userRoute = require("./routes/user");
const noteRoute = require("./routes/note");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(express.static("static"));

app.get('/',(req,res)=>{
  res.render('main')
})
app.use("/user", userRoute);
app.use("/notebook", noteRoute);


app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});
