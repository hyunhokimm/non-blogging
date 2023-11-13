const express = require("express");
const userRoute = express.Router();
const { login, isLogin } = require("../../controller/Clogin");
const { signUpPage, signUpProcess } = require("../../controller/Csignup");

// 로그인
userRoute.get("/login", login);
userRoute.post("/login", isLogin);

// 회원가입
userRoute.get("/signup", signUpPage);
userRoute.post("/signup", signUpProcess);

//회원정보
userRoute.get("/myinfo", (req, res) => {
  res.render("myInfo");
});

module.exports = userRoute;
