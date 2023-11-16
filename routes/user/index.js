const express = require("express");
const userRoute = express.Router();
const login = require("../../controller/Clogin");
const signup = require("../../controller/Csignup");

// 로그인
userRoute.get("/login", login);
userRoute.post("/login", isLogin);

// 회원가입
userRoute.get("/signup", signup);
userRoute.post("/signup", signupProcess);

//회원정보
userRoute.get("/myinfo", (req, res) => {
  res.render("myInfo");
});

module.exports = userRoute;
