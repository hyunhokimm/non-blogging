const { user, notebook, comment } = require("../model");

// 사용자 페이지 보여주기
exports.userPage = async (req, res) => {
  try {
    const email = req.session.user;
    if (!email) {
      return res.render("login");
    }

    const userInfo = await user.findOne({ where: { email: email } });
    if (!userInfo) {
      return res.render("login");
    }

    const noteInfo = await notebook.findAll({
      where: { connectUser: email },
      attributes: ["noteId", "title", "content", "img", "connectUser"],
    });

    if (noteInfo.length === 0) {
      return res.render("nonote");
    }

    const notebooks = noteInfo.map((note) => note.dataValues);

    return res.render("notebook", { user: userInfo, note: notebooks });
  } catch (error) {
    console.error(error);
    return res.status(500).send("접근 오류 발생");
  }
};

// 하나의 노트 상세페이지 보여주기
exports.userOneNote = async (req, res, next, noteid) => {
  try {
    let noteId;
    if (req.params) {
      noteId = req.params.noteId;
    } else {
      noteId = noteid;
    }

    const userEmail = req.session.user;

    const comments = await comment.findAll({
      where: { noteId: req.params.noteId },
      include: [{ model: user, attributes: ["nickname"] }],
      order: [["noteId", "ASC"]],
    });

    let noteOne = await notebook.findOne({
      attributes: ["noteId", "title", "content", "img", "connectUser"], // 선택할 열을 지정합니다
      where: {
        noteId: noteId, // 쿼리에 사용자 이메일을 포함합니다.
      },
    });

    if (!noteOne) {
      // 노트를 찾을 수 없는 경우 처리
      return res.status(404).render("write");
    }

    return res.render("note", {
      note: noteOne,
      user: userEmail,
      comment: comments,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

//유저 블로그들 페이지 보여주기
exports.userNotebook = async (req, res) => {
  const currentUser = req.session.user;

  if (!currentUser) {
    res.render("login");
  }
  try {
    const result = await user.findOne({ where: { email: email } });
    if (result) {
      await notebook.findAll({ where: { currentUser: email } });
      console.log("조회 ", userResult, noteResult);
      return res.render("notebook", { user: userResult, note: noteResult });
    } else {
      res.render("login");
    }
  } catch (error) {
    console.log(userErr);
    return res.status(500).send("접근 오류 발생");
  }
};
