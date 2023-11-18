const express = require("express");
const upload = require("../../public/multer");
const noteRoute = express.Router();

const blogging = require("../../controller/Cblogging");
const { home } = require("../../controller/Chome");
const { notebook } = require("../../controller/Cmypost"); // 수정
const { note, editNote, deleteNote } = require("../../controller/Cmypost"); // 수정

// 모든 블로그
noteRoute.get("/allblog", home);

// 나의 게시글들
noteRoute.get("/myblog", notebook);

// 작성된 노트 보기
noteRoute.get("/note", (req, res) => {
  res.render("note");
});

// 나의 블로그 작성
noteRoute.get("/write", blogging.write);

// 노트북 작성
noteRoute.post("/write", upload.array("img"), (req, res) => {
  const img = req.files[0].filename;

  const content = JSON.parse(req.body.blog);
  const blog = { img, title: content.title, content: content.content };
  noteCreate(blog, res);
});

// 게시물 상세 페이지
noteRoute.get("/notebook/:noteId", note);

// 게시글에 작성자 연동
noteRoute.get("/write", async (req, res) => {
  const posts = await notebook // 수정
    .find({})
    .sort({ createdAt: -1 })
    .populate("author");

  res.render("posts/list", { posts });
});

// 수정및삭제 작성자 확인
noteRoute.get("/write", async (req, res) => {
  const note = await notebook.findOne({ noteId }).populate("author");

  if (note.author.noteId !== req.user.noteId) {
    throw new Error("Not Authorized");
  }
});

// 게시물 수정 페이지
noteRoute.post("/notebook/:noteId", editNote);

// 게시물 삭제 기능
noteRoute.delete("/notebook/:noteId", deleteNote);

module.exports = noteRoute;
