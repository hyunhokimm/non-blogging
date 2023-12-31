const express = require("express");
const upload = require("../../public/multer");
const noteRoute = express.Router();

const { home } = require("../../controller/Chome");

const {
  note,
  editNote,
  deleteNote,
  notebook,
  createNote,
  write,
  editNotePage,
} = require("../../controller/Cmypost"); // 수정
const { userPage, userOneNote } = require("../../controller/Cmyblog");

const { uploadComment, getCommentById, updateCommentProcess, deleteComment } = require("../../controller/Ccomment"); // 댓글

// 모든 블로그 보여주기
noteRoute.get("/allblog", home);

// 나의 게시글들 보여주기
noteRoute.get("/", (req, res) => {
  userPage(req, res);
});

// 작성된 노트 보기(1개의 노트) 보여주기
noteRoute.get("/:noteId", (req, res) => {
  userOneNote(req, res);
});

// 나의 블로그 작성 페이지 보여주기
noteRoute.get("/write", (req, res) => {
  if (!req.session.user) return res.render("login");
  console.log("write");
  write(req, res);
});

// 노트북 작성하기
noteRoute.post("/write", upload.array("img"), (req, res) => {
  const email = req.session.user;
  if (!email) return res.render("login");
  const img = req.files[0];

  const content = JSON.parse(req.body.blog);
  const blog = { img, title: content.title, content: content.content };
  createNote(blog, req, res);
});

// 게시물 상세 페이지 보여주기
noteRoute.get("/:noteId", note);

// 게시물 수정 페이지 보여주기
noteRoute.get("/notemodify/:noteId", (req, res) => {
  const noteid = req.params.noteId;
  editNotePage(noteid, res);
});

// 게시물 수정 하기
noteRoute.post("/modify", (req, res) => {
  editNote(req, res);
});

// 게시물 삭제 기능
noteRoute.get("/notedelete/:noteId", (req, res, next) => {
  console.log(req);
  deleteNote(req, res, next);
});

// 댓글 달기
noteRoute.post("/:noteId/comment", uploadComment);

// 댓글 수정
noteRoute.get("/:noteId/comment/:commentId", getCommentById);
noteRoute.patch("/:noteId/comment/:commentId", updateCommentProcess);

// 댓글 삭제
noteRoute.delete("/:noteId/comment/:commentId", deleteComment);

module.exports = noteRoute;
