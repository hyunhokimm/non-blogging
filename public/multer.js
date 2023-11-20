const multer = require("multer");
const fs = require("fs");

try {
  fs.readdirSync("uploads"); // 폴더 확인
} catch (err) {
  console.error("uploads 폴더가 없습니다. 폴더를 생성합니다.");
  fs.mkdirSync("uploads"); // 폴더 생성
}

const upload = multer({
  storage: multer.diskStorage({
    // 저장한공간 정보 : 하드디스크에 저장
    destination(req, file, done) {
      // 저장 위치
      done(null, "uploads/"); // uploads라는 폴더 안에 저장
    },
    filename(req, file, done) {
      // 파일명을 어떤 이름으로 올릴지
      const ext = file.originalname.split(".").pop();
      console.log(ext); // 파일의 확장자
      const filename = encodeURIComponent(file.originalname); // URL 인코딩된 파일 이름
      done(null, filename + Date.now() + "." + ext); // 파일/ 저장
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5메가로 용량 제한
});

module.exports = upload;
