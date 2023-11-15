const notebook = require("../model");

// 게시물 상세 페이지
exports.note = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await notebook.findOne({ noteId }); // 게시글 검색
    if (!note) {
      throw new Error("Nonote"); //render("nonote")예정
    }

    res.render("/notebook/nonote", { post });
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
    res.send("Success Delete"); // alert 삭제되엇슴당 띄우기!
  } catch (err) {
    next(err);
  }
};
