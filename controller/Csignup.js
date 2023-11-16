const { User } = require("../model/User");

// 회원가입 페이지
exports.signup = (req, res) => {
  res.render("signup");
};

// 회원가입 진행
exports.signupProcess = (req, res) => {
  console.log(req.body);
  const data = {
    email: req.body.email,
    nickname: req.body.nickname,
    password: req.body.password,
  };
  User.create(data) // 이 부분에서 User 모델을 사용하도록 수정
    .then((result) => {
      res.send(result);
    })
    .catch(function (err) {
      console.log(err);
      res.status(500).send("등록 오류가 발생하였습니다.");
    });
};
