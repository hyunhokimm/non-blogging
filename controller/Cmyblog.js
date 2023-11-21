const { notebook } = require("../model");
const { user } = require("../model");

// 사용자 페이지

exports.userPage = async (req, res) => {
  try {
    const email = req.session.user;
    if (!email) {
      return res.render("login");
    }

    const userInfo = await user.findOne({ where: { email: email } });
    if (userInfo) {
      const noteInfo = await notebook.findAll({
        where: { connectUser: email },
        attributes: ["noteId", "title", "content", "img", "connectUser"],
      });
      if (noteInfo.length === 0) {
        return res.render("nonote");
      }
      let notebooks = [];
      noteInfo.map((note) => {
        notebooks.push(note.dataValues);
      });

      res.render("notebook", { user: userInfo, note: notebooks });
    }
  } catch (error) {
    console.log(error);
    res.st;
    atus(500).send("접근 오류 발생");
  }
};

exports.userOneNote = async (req, res, next) => {
  if (!req.session.user) return res.render("login");
  console.log(req.params.noteId);
  try {
    const noteId = req.params.noteId;

    const userEmail = req.session.user;

    const noteOne = await notebook.findOne({
      attributes: ["noteId", "title", "content", "img", "connectUser"], // 선택할 열을 지정합니다
      where: {
        noteId: noteId,
        connectUser: userEmail, // 쿼리에 사용자 이메일을 포함합니다.
      },
    });

    console.log(noteOne);

    if (!noteOne) {
      // 노트를 찾을 수 없는 경우 처리
      return res.status(404).render("write");
    }

    res.render("note", { note: noteOne });
  } catch (error) {
    console.error(error);
    // 에러를 적절히 처리합니다. 예를 들어 에러 페이지를 렌더링할 수 있습니다.
    res.status(500).send(error);
  }
};

exports.userNotebook = async (req, res) => {
  const currentUser = req.session.user;

  if (!currentUser) {
    res.render("login");
  }
  try {
    const result = await user.findOne({ where: { email: email } });
    if (result) {
      notebook.findAll({ where: { currentUser: email } });
      console.log("조회 ", userResult, noteResult);
      res.render("notebook", { user: userResult, note: noteResult });
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(userErr);
    res.status(500).send("접근 오류 발생");
  }

  // user
  //   .findOne({
  //     where: {
  //       email: currentUser,
  //     },
  //   })
  //   .then((result) => {
  //     console.log("결과 ", result);
  //     res.render("notebook", { result, currentUser });
  //   })
  //   .catch((userErr) => {
  //     console.log(userErr);
  //     res.status(500).send("접근 오류 발생");
  //   });
};
