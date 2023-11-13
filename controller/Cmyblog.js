const { postTable } = require("../model");

// 나의 게시글들
exports.notebook = (req, res) => {
  res.render("notebook");
};

// 나의 블로그 작성
exports.write = (req, res) => {
  if (postTable.postid) {
    // ??기존유저
    res.render("write");
    // 신규유저
  } else {
    res.render("write");
  }
};
