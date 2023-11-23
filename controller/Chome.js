const { user, notebook } = require("../model");

// 모든 블로그들 페이지 보여주기
exports.home = async (req, res) => {
  const email = req.session.user;

  let blogs = [];

  const allNotebook = await notebook.findAll({
    attributes: ["noteId", "title", "content", "img", "connectUser"],
  });
  allNotebook.map(async (user) => {
    blogs.push(user.dataValues);
  });

  res.render("allblog.ejs", { blogs });
};
