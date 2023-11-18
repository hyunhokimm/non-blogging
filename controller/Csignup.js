const { user } = require("../model");

// 회원가입 페이지
exports.signup = (req, res) => {
  res.render("signup");
};

// 회원가입 진행
exports.signupProcess = async (req, res) => {
  const { email, nickname } = req.body;

  try {
    // 이메일 또는 닉네임이 이미 존재하는지 확인
    const existingUser = await user.findOne({
      where: {
        user: [{ email }, { nickname }],
      },
    });

    if (existingUser) {
      // 이미 존재하는 경우
      return res.status(400).send("이미 가입된 이메일 또는 닉네임입니다.");
    }

    // 존재하지 않는 경우, 회원가입 진행
    const newuser = await user.create({ email, nickname });
    return res.status(201).send(newuser);
  } catch (err) {
    console.error(err);
    return res.status(500).send("등록 오류가 발생하였습니다.");
  }
};
