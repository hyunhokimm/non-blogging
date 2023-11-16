const { user, notebook } = require("../model");

// 게시물 작성페이지

exports.write=(req, res)=>{
  res.render('write')
}

exports.writePost = (req, res) => {
  // select * from user where id = 'aaa@email.com'
  // 1
  req.session.email = req.body.email;
  // user
  //   .findOne({
  //     where: {
  //       email: req.body.email,
  //     },
  //   })
  //   .then((result) => {
  //     if (result) {
  //       res.render("write", { data: result });
  //     } else {
  //       res.render("allblog");
  //     }
  //   })
  //   .catch((err) => {
  //     console.log()
  //     res.status(500).send("접근 오류 발생");
  //   });
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
