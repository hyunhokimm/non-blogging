const express = require("express");
const app = express();

app.set('view engine', 'ejs')

app.get('/', (req, res)=>{
  res.render('userCreate')
})

app.listen(8000, () => {
  console.log("http://localhost:8000");
});
