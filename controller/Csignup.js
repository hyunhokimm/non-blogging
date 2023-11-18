
const { user } = require("../model");
const crypto = require("crypto");



exports.signUpPage = (req, res) => {
  res.render("signup");
}

// 회원가입 진행
exports.signupProcess = async (req, res) => {
  const { email, password, nickname } = req.body;

  try {
    const result = await user.findOne({ where: { email } });
    console.log(result, "result");

    if (result) {
      return res.status(400).send("이미 가입되어 있는 이메일 입니다.");
    }

    const hashpassword = hashPassword(password);

    user
      .create({
        email,
        password: hashpassword,
        nickname,
      })
      .then(() => {
        // return res.render("signup");
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).send("등록 오류가 발생하였습니다.");
      });
  } catch (error) {
    console.error("Error during signupProcess:", error);
    res.status(500).send("등록 오류가 발생하였습니다.");
  }
};

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")

    .toString("hex");

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
