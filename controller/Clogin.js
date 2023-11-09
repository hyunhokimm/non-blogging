const { User } = require("../model/index");

exports.index = (req, res) => {
  console.log(req.headers.cookie);
  res.render("login");
};

exports.signin = (req, res) => {
  res.render("signin");
};
exports.postSignin = (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ where: { email, password } });
  if (user) {
    // req.cookie.user = user;
    res.send(user);
  } else {
    res.status(401).send({ msg: "Login Failed" });
  }
};

exports.profile = (req, res) => {
  const id = req.headers.cookie.split("=")[1];
  const user = User.findOne({
    where: { id: id },
  });

  if (user) {
    res.render("profile", { data: user });
  } else {
    res.redirect("/user/signup");
  }
};
