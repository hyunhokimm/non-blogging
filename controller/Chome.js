const { user } = require("../model");
const { notebook } = require("../model");

// allblog page
exports.home = async (req, res) => {
  const email = req.session.user;

  console.log(email);
  let blogs = [];

  const allNotebook = await notebook.findAll({
    attributes: ["noteId", "title", "content", "img", "connectUser"],
  });
  allNotebook.map(async (user) => {
    blogs.push(user.dataValues);
  });

  console.log(blogs);

  res.render("allblog.ejs", { blogs });
};
