const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
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

// index.js 와 같은 위치에 있는 .env 파일을 불러와서 환경변수로 사용할 수 있게 하는것
dotenv.config({ path: path.join(__dirname, "./config/envs/.env") });
// dotenv.config({
//   path: path.join(__dirname, `./config/envs/.env`),
// });
// dotenv.config({ path: path.join(__dirname, "./config/envs/.env") });

app.get("/", (req, res) => {
  res.render("main");
});

const userRoute = require("./routes/user");
const noteRoute = require("./routes/note");

app.use("/user", userRoute);
app.use("/notebook", noteRoute);

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});
