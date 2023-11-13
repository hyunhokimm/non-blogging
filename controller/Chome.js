const { User } = require("../model/index");

// exports.home = (req, res) => {
//     res.render("allblog");
//   };

exports.home = (req, res) => {
  const allblog = User.findAll({
    attributes: ["id", "nickname"],
    // 또같은 블로그만 불러와지니 배열로 랜덤방식! sort방식 검색해보자~~
  });

  res.render("allblog.ejs", { allblog });
};

//   exports.home = (req, res) => {
//     const allblog = User.findAll();

//     res.send(allblog);
//   };
