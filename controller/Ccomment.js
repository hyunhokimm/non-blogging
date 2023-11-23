const { comment } = require("../model");

// 댓글 달기
exports.uploadComment = (req, res) => {
    const { noteId } = req.params;
    const { commentWrite, email } = req.body;

    comment.create({
        commentWrite: commentWrite,
        email: email,
        noteId: noteId,
    }).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("등록 오류 발생");
    })
}

// 선택한 댓글 읽어오기
exports.getCommentById = (req, res) => {
    comment.findOne({
        where: {
            commentId: req.params.commentId
        }
    }).then((result) => {
        console.log("id ",req.params.commentId);
        console.log("findOne() is ", result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(500).send("오류 발생")
    })
};

// 댓글 수정 기능
exports.updateCommentProcess = (req, res) => {
    comment.update(req.body, {
        where: {
            commentId: req.params.commentId
        }
    }).then((result) => {
        console.log("id ",req.params.commentId);
        console.log("수정 ", result);
        res.send({ result: true }); // 수정된 댓글 데이터를 클라이언트에 전송
    }).catch((err) => {
        console.log(err);
        res.status(500).send();
    });
};

// 댓글 삭제 기능
exports.deleteComment = (req, res) => {
    comment.destroy({
        where: {
            commentId: req.params.commentId
        }
    }).then(function(result){
        console.log("destroied? ", result);
        res.send({result: true})
        res.render("note");
    }).catch(function(err){
        console.log(err);
        res.status(500).send("삭제 오류 발생")
    })
}