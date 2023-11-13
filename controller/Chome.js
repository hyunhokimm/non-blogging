const { userTable } = require("../model/index");

// allblog page
exports.home = (req, res) => {
  const allblog = userTable.findAll({
    attributes: ["id", "nickname"],
    // 또같은 블로그만 불러와지니 배열로 랜덤방식! sort방식 검색해보자~~
  });

  res.render("allblog", { allblog });
};
