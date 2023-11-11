const { userTable } = require("../model");
const { postTable } = require("../model");

exports.postPage = (req, res) => {
    userTable.findOne({
        where: {
            id: req.body.userId,
        }
    }).then((result) => {
        console.log("조회 ", result);
        if(result){
            res.render("blogging", {data: result})
        }
        else{
            res.render("allblog");
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send("접근 오류 발생");
    })
}

exports.uploadPostProcess = (req, res) => {
    const data = {
        title: req.body.title,
        content: req.body.content,
        userId: req.body.userId
    }
    postTable.create(data).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("등록 오류 발생");
    })
}