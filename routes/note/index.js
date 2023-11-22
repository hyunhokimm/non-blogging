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

const { userNotebook } = require("../../controller/Cmyblog"); // 수정

// 모든 블로그
noteRoute.get("/allblog", home);

// 나의 게시글들
noteRoute.get("/", (req, res) => {
  userPage(req, res);
});

// 작성된 노트 보기(1개의 노트)
noteRoute.get("/:noteId", (req, res) => {
  userOneNote(req, res);
});

// 나의 블로그 작성

noteRoute.get("/write", (req, res) => {
  if (!req.session.user) return res.render("login");
  console.log("write");
  write(req, res);
});

// 노트북 작성
noteRoute.post("/write", upload.array("img"), (req, res) => {
  const email = req.session.user;
  if (!email) return res.render("login");
  const img = req.files[0];

  const content = JSON.parse(req.body.blog);
  const blog = { img, title: content.title, content: content.content };
  createNote(blog, req, res);
});

// 게시물 상세 페이지
noteRoute.get("/:noteId", note);

// 게시물 수정 페이지 보여주기
noteRoute.get("/notemodify/:noteId", (req, res) => {
  const noteid = req.params.noteId;
  editNotePage(noteid, res);
});

// 게시물 수정 페이지
noteRoute.post("/modify", (req, res) => {
  editNote(req, res);
});

// 게시물 삭제 기능
noteRoute.get("/notedelete/:noteId", (req, res, next) => {
  console.log(req);
  deleteNote(req, res, next);
});

module.exports = noteRoute;
