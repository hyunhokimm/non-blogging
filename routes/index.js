const express = require("express");
const login = require("../controller/Clogin");
const router = express.Router();

router.get("/user/login", login.signin);
router.post("/user/login", login.postLogin);

module.exports = router;
