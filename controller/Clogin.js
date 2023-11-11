const { User } = require("../model/index");

// login.ejs > 첫 페이지
exports.index = (req, res) => {
  res.render("login");
};

// Login 성공 > myblog.ejs
exports.login = (req, res) => {
  res.render("myblog");
};

// Login 실패 > login.ejs
exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ where: { email, password } });
  if (user) {
    res.send(user);
  } else {
    res.status(401).send({ msg: "Login Failed" });
  }
};
