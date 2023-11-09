const express = require("express");
const login = require("../controller/Clogin");
const signup = require("../controller/signup");
const router = express.Router();

router.get("/user/login", login.signin);
router.post("/user/login", login.postLogin);

// 회원가입 라우터 툴
router.get("/user/signup", signup.signUpPage);
router.post("/user/signup", signup.signUpProcess);

module.exports = router;
