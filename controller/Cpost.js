// 게시글 데이터베이스 연결
const { postContent } = require("../model/Post");

// 게시글 페이지
exports.postPage = (req, res) => {
    res.render("postPage");
}

// 게시글 불러오기
exports.postList = (req, res) => {
    postContent.findAll().then((result) => {
        console.log("findAll(): ", result);
        res.render("postPage", { data: result });
    });
}

// 게시글 작성하기
exports.createPost = (req, res) => {
    const data = {
        title: req.body.title,
        content: req.body.content
    }
    postContent.create(data).then((result) => {
        res.send(result);
    }).catch(function(err){
        console.log(err);
        res.status(500).send("글을 게시할 수 없습니다.")
    });
}

// 게시글 찾아오기
exports.findPost = (req, res) => {
    postContent.findOne({
        where: {
          id: req.params.id
        }
    }).then(function(result){
        console.log("findOne() is ", result);
        res.send(result);
    }).catch(function(err){
        console.log(err);
        res.status(500).send("게시한 글을 찾아올 수 없습니다.")
    });
}

// 게시글 수정하기
exports.updatePost = (req, res) => {
    const data = {
        title: req.body.title,
        content: req.body.content
    }
    postContent.create(data).then((result) => {
        console.log("결과", result);
        res.send(result);
    }).catch(function(err){
        console.log(err);
        res.status(500).send("글을 수정할 수 없습니다.")
    });
}

// 게시글 삭제하기
exports.deletePost = (req, res) => {
    postContent.destroy({
        where: {
          id: req.params.id
        }
    }).then((result) => {
        console.log("destroied? ", result);
        res.send({result: true})
    }).catch(function(err){
        console.log(err);
        res.status(500).send("삭제할 수 없습니다.")
    })
}
