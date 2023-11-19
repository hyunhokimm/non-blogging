const { notebook } = require("../model");
const { user } = require("../model");

// 사용자 페이지
exports.userPage = async (req, res) => {
  try {
    const email = req.session.user;
    console.log(email);
    if (!email) {
      return res.render("login");
    }

    const userInfo = await user.findOne({ where: { email: email } });
    if (userInfo) {
      const noteInfo = await notebook.findAll({
        where: { connectUser: email },
        attributes: ["noteId", "title", "content", "img", "connectUser"],
      });
      console.log(noteInfo);
      if (!noteInfo) {
        res.render("nonote");
      }
      console.log("조회 ", userInfo, noteInfo);
      res.render("notebook", { user: userInfo, note: noteInfo });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("접근 오류 발생");
  }
};
