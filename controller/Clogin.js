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


    const findUser = await user.findOne({ where: { email: idBox } });
    if (!findUser) {
      return res.json({ success: false, msg: "등록된 이메일이 없습니다." });
    }
    const compare = comparePassword(pwBox, findUser.dataValues.password);
    console.log(compare);

    if (compare) {
      console.log("로그인");
      req.session.user = findUser.email;
      return res.json({
        success: true,
        msg: "로그인 성공",
        email: findUser.email,
        // redirectTo: "myInfo",
      });
    } else {
      return res.json({ success: false, msg: "Login Failed" });
    }
  } catch (error) {
    console.error("로그인 중 오류 발생:", error);
    return res.status(500).json({ success: false, msg: "내부 서버 오류" });

  }


// 로그아웃 기능
exports.logout = (req, res) => {
  if(req.session.user){
    req.session.destroy((err) => {
      res.send({ result: true })
    })
  }
  else{
    res.send({ result: false })
  }
}

function comparePassword(inputPassword, hashedPassword) {
  const [salt, expectedHash] = hashedPassword.split(":");
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, salt, 1000, 64, "sha512")
    .toString("hex");

  console.log(expectedHash, "expectedHash");
  console.log(inputHash, "inputHash");

  return inputHash === expectedHash;
}
