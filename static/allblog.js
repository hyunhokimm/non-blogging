//시계
const clockContainer = document.querySelector(".showTimeJs");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  clockContainer.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}
function timeCheck() {
  getTime();
  setInterval(getTime, 1000);
}
timeCheck();

//이미지 랜덤으로 보여주기
const imageBox = document.querySelector(".imageBox");
const IMG_NUMBER = 5;

function getImage(imgNumber) {
  const image = new Image();
  image.src = `/static/images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  imageBox.prepend(image);
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function changeImage() {
  const randomNumber = getRandom();
  getImage(randomNumber);
}
changeImage();

//날짜 보여주기
const dateBox = document.querySelector(".showDate");

function getDate() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const whatDay = week[today.getDay()];

  dateBox.innerText = `${month}월 ${date}일 ${whatDay}요일`;
}
getDate();
