const { user } = require("../model");

// login.ejs > main 페이지
exports.login = (req, res) => {
  res.render("login");
};

exports.isLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  try {
    const findUser = await user.findOne({ where: { email, password } });

    if (findUser) {
      req.session.user = findUser.email;
      res.json({ success: true, user: findUser });
    } else {
      res.json({ success: false, msg: "Login Failed" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};
