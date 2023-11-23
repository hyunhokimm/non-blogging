const { user } = require("../model");
const crypto = require("crypto");

// 로그인 페이지 보여주기
exports.login = (req, res) => {
  console.log(req.session.user);
  res.render("login");
};


//로그인 함수
exports.isLogin = (req, res) => {
  const { email, password } = req.body;

  user.findOne({ where: { email: email } }).then((result) => {
    console.log(result);
    if (result) {
      const compare = comparePassword(password, result.dataValues.password);
      if (compare) {
        console.log("로그인");
        req.session.user = email;
        res.send(email);
      } else if (!compare) {
        res.status(400).send("비밀번호가 틀렸습니다.");
      }
    } else {
      res.status(400).send("등록된 이메일이 없습니다.");
    }
  });
};

// 비밀번호와 해쉬 비밀번호 비교하기
function comparePassword(inputPassword, hashedPassword) {
  const [salt, expectedHash] = hashedPassword.split(":");
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, "sha512")
    .toString("hex");

  console.log(expectedHash, "expectedHash");
  console.log(inputHash, "inputHash");

  return inputHash === expectedHash;
}
