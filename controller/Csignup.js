// 회원가입 데이터베이스 연결
const { signup } = require("../model/User");

// 회원가입 페이지
exports.signUpPage = (req, res) => {
    // 회원가입 뷰
    res.render("userCreate");
}

// 회원가입 진행
exports.signUpProcess = (req, res) => {
    const data={
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password
    }
    signup.create(data).then((result) => {
        res.send(result);
    }).catch(function(err){
        console.log(err);
        res.status(500).send("등록 오류가 발생하였습니다.");
    })
}