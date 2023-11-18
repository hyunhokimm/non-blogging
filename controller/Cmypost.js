const { notebook } = require("../model");

// 게시물 전체 페이지
exports.notebook = async (req, res) => {
  res.render("/notebook/note", { notebook });
};

//게시물 등록 페이지
exports.createNote = async (content, res) => {
  console.log(content);
  // const result = await notebook.create(content)
};

// 게시물 상세 페이지
exports.note = async (req, res, next) => {
  try {
    const { noteId } = req.params;
    const note = await notebook.findOne({ noteId }); // 게시글 검색
    if (!note) {
      throw new Error("./views/fragment/nonote");
    }

    res.render("/notebook/note", { post });
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
