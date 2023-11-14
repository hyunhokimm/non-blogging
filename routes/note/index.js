const express = require("express");
const noteRoute = express.Router();
// const {postPage,uploadPostProcess} = require("../../controller/Cblogging");
// const { home } = require("../../controller/Chome");
// const { noteId } = require("../../controller/Cmypost");

// 모든 블로그
noteRoute.get("/notebook/allblog", (req, res) => {
  res.render("allblog");
});
// // 수정될 코드
// noteRoute.get("/allblog", home);

// 나의 게시글들
noteRoute.get("/notebook", (req, res) => {
  res.render("notebook");
});
// 수정될 코드
// noteRoute.get("/", notebook)

//나의 블로그 작성
noteRoute.get("/notebook/write", (req, res) => {
  res.render("write");
});
// 수정될 코드
// noteRoute.get("/write", write)

noteRoute.post("/notebook/write", (req, res) => {
  res.render("write");
});
// 수정될 코드
// noteRoute.post("/notebook/write", write);
// });

// 게시물 상세 페이지 - 컨트롤러 구현 전
// router.get("/notebook/:noteId", async (req, res, next) => {
//   try {
//     const { noteId } = req.params;
//     const post = await Post.findOne({ noteId }); // 게시글 검색
//     if (!post) {
//       throw new Error("Post NotFound");
//     }

//     res.render("/notebook/:noteId" <<<<<????이게 맞나?, { post });
//   } catch (error) {
//     next(error);
//   }
// });

// 게시글에 작성자 연동
// router.get("/", async (req, res) => {
//   const posts = await Post.find({})
//     .sort({ createdAt: -1 })
//     .skip(perPage * (page - 1))
//     .limit(perPage)
//     .populate("author"); // ***********
//   res.render("posts/list", { posts });
// });

// // 수정및삭제 작성자 확인
// const post = await Post.find({
//   noteId,
// }).populate("author");

// if (post.author.shortId !== req.user.shortId) {
//   throw new Error("Not Authorized");
// }

// 게시물 수정 페이지
// router.post("/:noteId", async (req, res, next) => {
//   const { noteId } = req.params;
//   const { title, content } = req.body;
//   const post = await Post.findOneAndUpdate(
//     { noteId },
//     {
//       title,
//       content,
//     }
//   ); // noteId 검색해서 내용을 title, content로 변경
//   if (!post) {
//     throw new Error("Post NotFound");
//   }

//   res.rendirect(`/notebook/${noteId}`, { post });
// });

// 게시물 삭제 기능
router.delete("/notebook/:noteId", async (req, res, next) => {
  const { noteId } = req.params;
  try {
    await Post.delete({ noteId });
    res.send("Success Delete");
  } catch (err) {
    next(err);
  }
});

module.exports = noteRoute;
