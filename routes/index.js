const express = require("express");
const login = require("../controller/Clogin");
const signup = require("../controller/Csignup");
const allblog = require("../controller/Chome");
const postContent = require("../controller/Cblogging")
const router = express.Router();


// 로그인
router.get("/user/login", login.signin);
router.post("/user/login", login.postLogin);

// 회원가입
router.get("/user/signup", signup.signUpPage);
router.post("/user/signup", signup.signUpProcess);

// Home 화면
router.get("/allblog", allblog.home);

// 게시글 화면과 등록
router.get("/post/list", postContent.postPage);
router.post("/post", postContent.uploadPostProcess);

module.exports = router;
