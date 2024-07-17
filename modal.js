/**
 * game modal 구현 부분
 */

// 변수 선언
const modal = document.getElementById("modal");
const modalOpenBtn = document.getElementById("open_modal");
const modalCloseButton = document.getElementsByClassName(
  "modal_content_close"
)[0];

// on modal button click event
modalOpenBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

// close modal button click event
modalCloseButton.addEventListener("click", () => {
  modal.style.display = "none";
});

// if click window: 모달 창을 제외한 화면 클릭 시 모달 창 close
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
