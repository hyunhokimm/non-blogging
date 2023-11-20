const crypto = require("crypto");
const { user } = require("../model");

// 프로필 화면 접근
exports.profilePage = (req, res) => {
    if(!req.session.user){
        res.render("signup");
        return false;
    }
    user.findOne({
        where: {
            email: req.session.user,
        }
    }).then((result) => {
        console.log("조회 ", result);
        if(result){
            res.render("myInfo", { email: result.email, nickname: result.nickname });
        }
        else{
            res.render("signup");
        }
    }).catch(function(err){
        console.log(err);
        res.status(500).send("접근 오류 발생");
    })
}

// 프로필 업데이트
exports.updateProfile = (req, res) => {
    if(!req.session.user){
        res.render("signup");
        return false;
    }

    const data = {
        email: req.body.email,
        nickname: req.body.nickname,
        password: hashPassword(req.body.password)
    }

    // 수정: user.update -> user.save
    user.findOne({
        where: {
            email: req.session.user
        }
    }).then((foundUser) => {
        if (foundUser) {
            foundUser.email = data.email;
            foundUser.nickname = data.nickname;
            foundUser.password = data.password;
            foundUser.save()
                .then((result) => {
                    console.log("수정 ", result);
                    res.json({ result: true });
                })
                .catch((err) => {
                    console.log(err);
                    res.status(500).send();
                });
        } else {
            res.status(404).send("User not found");
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
}

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, "sha512")
        .toString("hex");
    return `${salt}:${hash}`;
}
  