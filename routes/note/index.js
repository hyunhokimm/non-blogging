const express = require("express");
const noteRoute = express.Router();
// const {home} = require("../../controller/Chome");
// const {postPage,uploadPostProcess} = require("../../controller/Cblogging");

// 모든 블로그
noteRoute.get("/allblog", (req,res)=>{
    res.render('allblog')
});

// 나의 게시글들
noteRoute.get("/", (req, res)=>{
    res.render('notebook')
});

//나의 블로그 작성
noteRoute.get("/write", (req, res)=>{
    res.render('write')
});


module.exports= noteRoute