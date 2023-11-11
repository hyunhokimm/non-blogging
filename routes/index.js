const express = require("express");
const login = require("../controller/Clogin");
const signup = require("../controller/signup");
const router = express.Router();

router.get("/user/login");
router.post("/user/login");

// 회원가입 라우터 툴
router.get("/user/signup");
router.post("/user/signup", (req, res)=>{
    console.log(req.body)
});


module.exports = router;
