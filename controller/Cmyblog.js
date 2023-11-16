const notebook = require("../model");
const user = require("../model");

// 나의 게시글들
exports.notebook = (req, res) => {
  res.render("notebook");
};

// 나의 블로그 작성
exports.write = (req, res) => {
  // let userId = notebook();
  // let email = user();

  if (req.params.userId == req.params.email) {
    // ??기존유저
    res.render("write");
    // 신규유저
  } else {
    res.render("write");
  }
};
