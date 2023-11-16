const express = require("express");
const session = require("express-session");
const userRoute = require("./routes/user");
const noteRoute = require("./routes/note");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret key",
    resave: false, // 모든 요청마다 session을 다시 저장할건가?
    saveUninitialized: true, // client가 처음 접속할 때, 세션을 한 번 초기화 할건지?말건지?
    cookie: {
      httpOnly: true, // document.cookie로는 접속x
      maxAge: 60 * 60 * 24,
    },
    secure: true, // https에서만 동작하도록 함
  })
);

app.set("view engine", "ejs");
app.use(express.static("static"));

app.get("/", (req, res) => {
  res.render("main");
});

app.use("/user", userRoute);
app.use("/notebook", noteRoute);

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});
