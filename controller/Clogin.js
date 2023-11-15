const user = require("../model/User");

// login.ejs > main 페이지
exports.login = (req, res) => {
  res.render("login.ejs");
};

// Login 성공 > myblog.ejs
exports.isLogin = (req, res) => {
  res.render("myblog");
};

// Login 실패 > login.ejs
exports.isLogin = (req, res) => {
  const { email, password } = req.body;
  const user = user.findOne({ where: { email, password } });
  if (user) {
    res.send(user);
  } else {
    // res.status(401).send({ msg: "Login Failed" }); >> alert창으로 변경?
  }
};
