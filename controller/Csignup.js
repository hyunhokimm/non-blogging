const { user } = require("../model");
const crypto = require("crypto");

// 회원가입 페이지
exports.signup = (req, res) => {
  res.render("signup");
};

// 회원가입 진행
exports.signupProcess = async (req, res) => {
  const { email, password, nickname } = req.body;
  const result = await user.findOne({ email });
  console.log(result);
  const hashpassword = hashPassword(password);
  console.log("hashpass", hashpassword);
  user
    .create({
      email,
      password: hashpassword,
      nickname,
    })
    .then((result) => {
      return res.render("signup");
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send("등록 오류가 발생하였습니다.");
    });
};

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return `${salt}:${hash}`;
}
