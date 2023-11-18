const crypto = require("crypto");
const { User } = require("../model");

exports.signUpPage = (req, res) => {
  res.render("signup");
}

exports.signUpProcess = (req, res) => {
  const data = {
    email: req.body.email,
    // 비밀번호 해쉬로 암호화
    password: hashPassword(req.body.password),
    nickname: req.body.nickname
  }
  User.create(data).then((result) => {
    res.send(result);
  }).catch((err) => {
    console.log(err);
    res.status(500).send("등록 오류 발생");
  })
}

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}
