const { user, notebook } = require("../model");

// 게시물 작성페이지
exports.write = (req, res) => {
  res.render("write");
};

exports.writeNote = async (req, res) => {
  const img = req.files[0].filename;
  const content = JSON.parse(req.body.blog);
  console.log(content, req.session.email);
  const blog = {
    img,
    connectUser: req.session.email,
    title: "",
    content: "",
  };

  const result = await notebook.create(blog);

  console.log(result);

  res.send(result);

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
  //       res.render("notebook");
  //     }
  //   })
  //   .catch((err) => {
  //     res.status(500).send("접근 오류 발생");
  //   });
};

exports.writeNoteProcess = (content, res) => {
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
