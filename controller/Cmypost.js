const { notebook } = require("../model");
const { user } = require("../model");

// 게시물 전체 페이지 보여주기
exports.notebook = async (req, res) => {
  res.render("/notebook/note");
};

//게시물 작성페이지 보여주기
exports.write = (req, res) => {
  res.render("write");
};

//게시물 등록 페이지
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
      img: `localhost:3000/uploads/${content.img.filename}`,
      connectUser: email,
    });

    res.send("저장 성공");
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
    console.log(note);
    res.render("/notebook/note", { note: note });
  } catch (error) {
    next(error);
  }
};

// 게시물 수정 페이지
exports.editNote = async (req, res, next) => {
  const { noteId } = req.params;
  const { title, content } = req.body;
  const note = await notebook.findOneAndUpdate(
    { noteId },
    {
      title,
      content,
    }
  ); // noteId 검색해서 내용을 title, content로 변경
  if (!note) {
    throw new Error("nonote");
  }

  res.rendirect(`/notebook/:${noteId}`, { note });
};

// 게시물 삭제 기능
exports.deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  try {
    await notebook.delete({ noteId });
    res.send("Success Delete");
  } catch (err) {
    next(err);
  }
};

// exports.uploadNoteProcess = (req, res) => {
//   const data = {
//     title: req.body.title,
//     content: req.body.content,
//     userId: req.body.email,
//   };
//   notebook
//     .create(data)
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).send("등록 오류 발생");
//     });
// };
