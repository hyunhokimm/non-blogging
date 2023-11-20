// const { comment } = require("../model");

// 댓글 달기
// exports.writeComment = (req, res) => {
//     const data = {
//         mention: req.body.mention,
//         noteId: req.body.noteId,
//         email: req.body.email,
//         nickname: req.body.nickname
//         테이블 완성 후 변경 가능성 있음
//     }
//     comment.create(data).then((result) => {
//         res.send(result);
//     }).catch((err) => {
//         console.log(err);
//         res.status(500).send("등록 오류 발생");
//     })
// }

// 선택한 댓글 읽어오기
// exports.getCommentById = (req, res) => {
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

// 댓글 수정 기능
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

// 댓글 삭제 기능
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