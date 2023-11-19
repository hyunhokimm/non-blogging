const { user } = require("../model");
const crypto = require("crypto");

// login.ejs > main 페이지
exports.login = (req, res) => {
  res.render("login");
};

exports.isLogin = async (req, res) => {
  try {
    const { idBox, pwBox } = req.body;
    console.log("-----------------------------");
    console.log(req.body);
    console.log("-----------------------------");

    const findUser = await user.findOne({ where: { email: idBox } });
    if (!findUser) res.status(400).send("등록된 이메일이 없습니다.");

    const compare = comparePassword(pwBox, findUser.dataValues.password);
    console.log(compare);

    if (compare) {
      console.log("로그인");
      req.session.user = idBox;
      res.render("allblog");
    } else {
      res.json({ success: false, msg: "Login Failed" });
    }
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    res.status(500).json({ success: false, msg: "내부 서버 오류" });
  }
};

function comparePassword(inputPassword, hashedPassword) {
  const [salt, expectedHash] = hashedPassword.split(":");
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, "sha512")
    .toString("hex");

  return inputHash === expectedHash;
}
