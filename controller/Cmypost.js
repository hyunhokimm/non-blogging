const { notebook, user } = require("../model");
const { home } = require("./Chome");
const { userPage } = require("./Cmyblog");

// 게시물 전체 페이지 보여주기
exports.notebook = async (req, res) => {
  res.render("/notebook/note");
};

//게시물 작성페이지 보여주기
exports.write = (req, res) => {
  console.log("write 작성중......");
  return res.render("write", { note: null });
};

//게시물 등록 
exports.createNote = async (content, req, res) => {
  console.log(req.session.user);

  try {
    if (!req.session.user) {
      res.render("login");
    }
    const email = req.session.user;
    const userInfo = await user.findOne({ where: { email: email } });
    await notebook.create({
      id: content.noteId,
      title: content.title,
      content: content.content,
      img: `http://101.101.219.106:3000/uploads/${content.img.filename}`,
      connectUser: email,
    });

    return res.send("저장 성공");
  } catch (error) {
    console.error("로스트 저장 중 오류 발생:", error);
    res.status(500).json({ success: false, msg: "내부 서버 오류" });
  }
};


// 게시물 상세 페이지
exports.note = async (req, res, next) => {
  try {
    const noteId = parseInt(req.params.noteId);
    const email = req.session.user;
    console.log(email);

    const note = await notebook.findOne({
      attributes: [
        "noteId",
        "title",
        "content",
        "img",
        "isPublic",
        "connectUser",
      ],
      where: {
        connectUser: email,
        noteId: noteId,
      },
    });
    res.render("note", { note: note, user });
  } catch (error) {
    next(error);
  }
};

//게시물 수정페이지 보여주기
exports.editNotePage = async (noteId, res) => {
  const result = await notebook.findOne({
    where: { noteId: noteId },
    attributes: [
      "noteId",
      "title",
      "content",
      "img",
      "isPublic",
      "connectUser",
    ],
  });

  console.log(result);

  return res.render("notemodify", { note: result });
};

// 게시물 수정 페이지
exports.editNote = async (req, res, next) => {
  if (!req.session.user) return res.render("login");
  console.log(req.body);
  const { title, editContent: content, blogId: noteId, imgUlr: img } = req.body;
  const user = req.session.user;
  if (!user) return res.render("login");
  try {
    const [update, updatedRows] = await notebook.update(
      { title, content, img },
      { where: { noteId } }
    );
    if (update > 0) {
      // 업데이트 성공
      console.log(`${update} update`);
      // 업데이트 성공 시 note 페이지를 렌더링해서 클라이언트에게 보냄
      userPage(req, res);
    } else {
      // 해당하는 노트가 없는 경우
      console.log("No rows updated.");
      res.status(404).send("Note not found.");
      return home(req, res);
    }
  } catch (error) {
    // 업데이트 실패
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// 게시물 삭제 기능
exports.deleteNote = async (req, res, next) => {
  console.log(req.params);
  const { noteId } = req.params;
  try {
    await notebook.destroy({ where: { noteId: noteId } });

    userPage(req, res);
  } catch (err) {
    next(err);
  }
};
