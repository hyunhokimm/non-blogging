const { user } = require("../model");
const crypto = require("crypto");

// login.ejs > main 페이지
exports.login = (req, res) => {
  console.log(req.session.user);
  res.render("login");
};

exports.isLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await user.findOne({ where: { email: email } });
    if (!findUser) {
      return res.status(400).send("등록된 이메일이 없습니다.");
    } else {
      const compare = comparePassword(password, findUser.dataValues.password);
      if (compare) {
        console.log("로그인");
        req.session.user = email;
        res.send("ok");
      } else if (!compare) {
        res.send("비밀번호가 틀렸습니다.");
      }
    }
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    res.status(500).send(error);
  }
};

function comparePassword(inputPassword, hashedPassword) {
  const [salt, expectedHash] = hashedPassword.split(":");
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, "sha512")
    .toString("hex");

  console.log(expectedHash, "expectedHash");
  console.log(inputHash, "inputHash");

  return inputHash === expectedHash;
}
