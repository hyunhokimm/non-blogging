const express = require("express");
const noteRoute = express.Router();
// const { home } = require("../../controller/Chome");
// const {postPage,uploadPostProcess} = require("../../controller/Cblogging");

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
// t수정될 코드
// noteRoute.post("/notebook/write", write);
// });

module.exports = noteRoute;
