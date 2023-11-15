const user = require("../model");
const notebook = require("../model");

// 게시물 작성페이지
exports.write = (req, res) => {
  user
    .findOne({
      where: {
        // 이부분 뭔가 헷갈림.. 리더님께 질문하기
        id: req.body.email,
      },
    })
    .then((result) => {
      if (result) {
        res.render("write", { data: result });
      } else {
        res.render("allblog");
      }
    })
    .catch((err) => {
      res.status(500).send("접근 오류 발생");
    });
};

exports.uploadNoteProcess = (req, res) => {
  const data = {
    title: req.body.title,
    content: req.body.content,
    userId: req.body.email,
  };
  notebook
    .create(data)
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("등록 오류 발생");
    });
};
