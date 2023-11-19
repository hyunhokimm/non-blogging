const express = require("express");
const userRoute = express.Router();
const { login, isLogin } = require("../../controller/Clogin");
const { signup, signupProcess } = require("../../controller/Csignup");
const { user } = require("../../model");

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
userRoute.get("/myinfo", async (req, res) => {
  if (!req.session.user) return res.render("login");
  const email = req.session.user;
  console.log(email);
  const result = await user.findOne({ where: { email } });
  if (!result) return res.render("login");
  console.log(result);
  res.render("myInfo", { userInfo: result.dataValues });
});

//유저 회원수정
userRoute.post("/myinfo", (req, res) => {
  console.log(req.body);
});

//유저 로그아웃
userRoute.get("/logout", (req, res) => {
  console.log(req.session.user);
  req.session.destroy();

  return;
});

module.exports = userRoute;
