const express = require("express");
const login = require("../controller/Clogin");
const signup = require("../controller/Csiagnup");
const allblog = require("../controller/Chome");
const router = express.Router();

// 로그인
router.get("/user/login", login.signin);
router.post("/user/login", login.postLogin);

// 회원가입
router.get("/user/signup", signup.signUpPage);
router.post("/user/signup", signup.signUpProcess);

// Home 화면
router.get("/allblog", allblog.home);

module.exports = router;
