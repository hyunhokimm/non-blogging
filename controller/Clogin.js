const { User } = require("../model/index");

exports.index = (req, res) => {
  console.log(req.headers.cookie);
  res.render("login");
};

exports.login = (req, res) => {
  res.render("signin");
};
exports.postLogin = (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ where: { email, password } });
  if (user) {
    res.send(user);
  } else {
    res.status(401).send({ msg: "Login Failed" });
  }
};
