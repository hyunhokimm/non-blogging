const express = require("express");
const userRoute = express.Router();
const { login, isLogin, logout } = require("../../controller/Clogin");
const { signup, signupProcess } = require("../../controller/Csignup");
const { profilePage, updateProfile } = require("../../controller/CmyInfo");

// 로그인
userRoute.get("/login", login);
userRoute.post("/login", (req, res) => {
  isLogin(req, res);
});

// 회원가입
userRoute.get("/signup", signup);
userRoute.post("/signup", (req, res) => {
  signupProcess(req, res);
});

//회원정보
userRoute.get("/myinfo", profilePage);
userRoute.patch("/update", updateProfile);

// 로그아웃
userRoute.delete("/logout", logout);

module.exports = userRoute;
