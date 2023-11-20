const express = require("express");
const userRoute = express.Router();
const { login, isLogin } = require("../../controller/Clogin");
const { signup, signupProcess } = require("../../controller/Csignup");
const { user } = require("../../model");
const { hashPassword } = require("../../controller/Csignup");

// 로그인
userRoute.get("/login", login);
userRoute.post("/login", (req, res) => {
  isLogin(req, res);
});

// 회원가입
userRoute.get("/signup", (req, res) => {
  signup(req, res);
});
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
  res.render("myInfo", { userInfo: result.dataValues });
});

//유저 회원수정

userRoute.post("/myinfo", async (req, res) => {
  console.log(req.session.user);
  const email = req.session.user;
  const { password, nickname } = req.body;

  try {
    if (!password && !nickname) {
      return res.status(400).send("비밀번호와 닉네임은 필수 항목입니다.");
    }

    const userInfo = await user.findOne({ where: { email: email } });

    if (userInfo) {
      if (nickname) {
        const updatedUserInfo = await userInfo.update({ nickname: nickname });
        console.log(updatedUserInfo);
      }

      if (password) {
        const hashedpassword = hashPassword(password);
        const updatedUserInfo = await userInfo.update({
          password: hashedpassword,
        });
        console.log(updatedUserInfo);
      }

      res.send("변경이 완료되었습니다.");
    } else {
      res.status(404).send("사용자를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("서버 오류 발생");
  }
});

//유저 로그아웃
userRoute.get("/logout", (req, res) => {
  console.log(req.session.user);
  req.session.destroy();

  return;
});

module.exports = userRoute;
