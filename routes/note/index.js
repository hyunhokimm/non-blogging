const express = require("express");
const noteRoute = express.Router();
const blogging = require("../../controller/Cblogging");
// const { home } = require("../../controller/Chome");
// const { noteId } = require("../../controller/Cmypost");

// 모든 블로그
noteRoute.get("/allblog", (req, res) => {
  res.render("allblog");
});
// // 수정될 코드
// noteRoute.get("/allblog", home);

// 나의 게시글들
noteRoute.get("/", (req, res) => {
  res.render("notebook");
});
// 수정될 코드
// noteRoute.get("/", notebook)

//작성된 노트 보기
noteRoute.get("/note", (req, res) => {
  res.render("note");
});

//나의 블로그 작성
// noteRoute.get("/write", (req, res) => {
//   res.render("write");
// });
// 수정될 코드
noteRoute.get("/write", blogging.write);

// noteRoute.post("/write", (req, res) => {
//   res.render("write");
// });
// 수정될 코드
// noteRoute.post("/notebook/write", write);
// });

// 게시물 상세 페이지
// noteRoute.get("/notebook/:noteId", note);

// 게시글에 작성자 연동
// router.get("/", async (req, res) => {
//   const notebook = await notebook.find({})
//     .sort({ createdAt: -1 })
//     .skip(perPage * (page - 1))
//     .limit(perPage)
//     .populate("author"); // ***********
//   res.render("posts/list", { posts });
// });

// // 수정및삭제 작성자 확인
// const note = await notebook.find({
//   noteId,
// }).populate("author");

// if (post.author.noteId !== req.user.noteId) {
//   throw new Error("Not Authorized");
// }

// 게시물 수정 페이지
// router.post("/notebook/:noteId", editNote);

// 게시물 삭제 기능
// router.delete("/notebook/:noteId", deleteNote);

module.exports = noteRoute;
