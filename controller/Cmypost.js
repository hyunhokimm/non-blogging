const { postTable } = require("../model");

// 글 하나 가져오기
exports.notePage = (req, res) => {
    const noteId = req.params.noteId;

    if(!noteId){
        res.render("index");
        return false;
    }

    postTable.findOne({
        where: {
            noteId: noteId,
        }
    }).then((result) => {
        console.log("조회 ", result);
        if(result){
            res.render("note", {note: result});
        }
        else{
            res.render("signup");
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send("접근 오류 발생");
    })
};