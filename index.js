const express = require("express");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

const dotenv = require("dotenv");
const path = require("path");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "/static")));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "secret key",
    resave: false, // 모든 요청마다 session을 다시 저장할건가?
    saveUninitialized: true, // client가 처음 접속할 때, 세션을 한 번 초기화 할건지?말건지?
    cookie: {
      httpOnly: true, // document.cookie로는 접속x
      maxAge: 60000,
    },
    secure: false, // https에서만 동작하도록 함
    store: new FileStore({
      path: "/sessions",
      retries: 3, // 시도 횟수
      retriesTimeout: 1000, // 재시도 간격 (밀리초)
    }), // nodejs 재시작이 되어도 세션 값 유지
  })
);

app.use((req, res, next) => {
  // 로깅 미들웨어 설정
  console.log(
    `${new Date().toISOString()} - ${req.method} ${req.url} ${req.session.user}`
  );

  next();
});

// index.js 와 같은 위치에 있는 .env 파일을 불러와서 환경변수로 사용할 수 있게 하는것
dotenv.config({ path: path.join(__dirname, "./config/envs/.env") });

app.get("/", (req, res) => {
  res.render("main");
});

const userRoute = require("./routes/user");
const noteRoute = require("./routes/note");

app.use("/user", userRoute);
app.use("/notebook", noteRoute);

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(port, function () {
  console.log(`http://localhost:${port}`);
});
