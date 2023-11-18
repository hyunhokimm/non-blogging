const { user } = require("../model");

// login.ejs > main 페이지
exports.login = (req, res) => {
  res.render("login");
};

exports.isLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const findUser = await user.findOne({ email });
    console.log(findUser);

    if (findUser) {
      return res.render("notebook");
    } else {
      return res.json({ success: false, msg: "Login Failed" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

function comparepassword(plainpassword, hashpassword) {
  const [salt, password] = plainpassword.split(":");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return hash === password;
}
