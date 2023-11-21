// const { comment } = require("../model");

// // 댓글 달기 // 테이블 칼럼 확정 후 수정 예정
// exports.writeComment = (req, res) => {
//     const { noteId } = req.params;
//     const { commentId, commentWrite, email, nickname, recodedTime } = req.body;

//     comment.create({
//         commentId: commentId,
//         commentWrite: commentWrite,
//         noteId: noteId,
//         email: email,
//         nickname: nickname,
//         recodedTime: recodedTime
//     }).then((result) => {
//         // 댓글 등록이 성공하면 해당 댓글 정보를 클라이언트로 응답
//         res.json(result);
//     }).catch((err) => {
//         console.log(err);
//         res.status(500).send("등록 오류 발생");
//     })
// }

// // 선택한 댓글 읽어오기
// exports.getComment = (req, res) => {
//     comment.findOne({
//         where: {
//             commentId: req.params.commentId
//         }
//     }).then((result) => {
//         console.log("findOne() is ", result);
//         res.send(result);
//     }).catch((err) => {
//         console.log(err);
//         res.status(500).send("오류 발생")
//     })
// };

// // 댓글 수정 기능
// exports.updateComment = (req, res) => {
//     comment.update(req.body, {
//         where: {
//             commentId: req.params.commentId
//         }
//     }).then((result) => {
//         console.log("수정 ", result);
//         res.send({result: true});
//     }).catch((err) => {
//         console.log(err);
//         res.status(400).send();
//     })
// }

// // 댓글 삭제 기능
// exports.deleteComment = (req, res) => {
//     comment.destroy({
//         where: {
//             commentId: req.params.commentId
//         }
//     }).then(function(result){
//         console.log("destroied? ", result);
//         res.send({result: true})
//         res.render("note");
//     }).catch(function(err){
//         console.log(err);
//         res.status(500).send("삭제 오류 발생")
//     })
// }