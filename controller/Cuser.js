// 로그인 한 직후 헤더에 보일 네 가지 접근 가능하는 컨트롤러 파일
const { userTable } = require("../model");

// 로그인 후 페이지
exports.userPage = (req, res) => {
    if(!req.headers.cookie){
        res.redirect("/");
        return false;
    }
    userTable.findOne({
        where: {
            id: req.headers.cookie,
        }
    }).then((result) => {
        console.log("조회 ", result);
        if(result){
            res.render("allblog", {data: result})
        }
        else{
            res.redirect("/");
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send("모든 블로그 접근 오류 발생");
    })
}

// 블로그 글 작성
exports.createMyPost = (req, res) => {
    if(!req.headers.cookie){
        res.redirect("/");
        return false;
    }
    userTable.findOne({
        where: {
            id: req.headers.cookie,
        }
    }).then((result) => {
        console.log("조회 ", result);
        if(result){
            res.render("blogging", {data: result})
        }
        else{
            res.redirect("/");
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send("블로그 작성 오류 발생");
    })
}

// 내 블로그 접근
exports.myBlog = (req, res) => {
    if(!req.headers.cookie){
        res.redirect("/");
        return false;
    }
    userTable.findOne({
        where: {
            id: req.session.user,
        }
    }).then((result) => {
        console.log("조회 ", result);
        if(result){
            res.render("myblog", {data: result})
        }
        else{
            res.redirect("/");
        }
    }).catch(function(err){
        console.log(err);
        res.status(500).send("내 블로그 접근 오류 발생");
    })
}

// 내 프로필 수정 페이지로 이동
exports.profilePage = (req, res) => {
    if(!req.headers.cookie){
        res.redirect("/");
        return false;
    }
    user.findOne({
        where: {
            id: req.headers.cookie,
        }
    }).then((result) => {
        console.log("조회 ", result);
        if(result){
            res.render("profile", {data: result})
        }
        else{
            res.redirect("/");
        }
    }).catch(function(err){
        console.log(err);
        res.status(500).send("프로필 수정 페이지 접근 오류 발생");
    })
}

// 로그아웃 구현
exports.logoutProcess = (req, res) => {
    if(req.headers.cookie){
        req.session.destroy((err) => {
            res.send({ result: true })
        })
    }
    else{
        res.send({ result: false })
    }
}