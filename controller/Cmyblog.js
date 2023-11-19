const { user, notebook } = require("../model");

// 사용자 페이지
exports.userNotebook = (req, res) => {
  const currentUser = req.session.user;

  if (!currentUser) {
    res.render("login");
    return false;
  }

  user.findOne({
    where: {
      email: currentUser,
    }
  }).then((result) => {
      console.log("결과 ",result);
      res.render("notebook", { result, currentUser });
  }).catch((userErr) => {
      console.log(userErr);
      res.status(500).send("접근 오류 발생");
  });

  // user.findOne({
  //   where: {
  //       email: email,
  //   }
  // }).then((userResult) => {
  //   if (userResult) {
  //     notebook.findAll({
  //       where: {
  //         currentUser: email,
  //       }
  //     }).then((noteResult) => {
  //       console.log("조회 ", userResult, noteResult);
  //       res.render("notebook", { user: userResult, note: noteResult });
  //     }).catch((noteErr) => {
  //       console.log(noteErr);
  //       res.status(500).send("접근 오류 발생");
  //     });
  //   } else {
  //     res.render("signUp");
  //   }
  // }).catch((userErr) => {
  //   console.log(userErr);
  //   res.status(500).send("접근 오류 발생");
  // });
};
