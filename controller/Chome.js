const { user, notebook } = require("../model");

// allblog page
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
