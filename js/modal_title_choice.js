const title = document.getElementById("triple_title_wrap");
const modalTitleOpen = document.getElementById("modal_title_choice_wrap");
const modalTitleCloseButton = document.getElementById("modal_title_choice_close");

title.addEventListener("click", () => {
    modalTitleOpen.style.display = "block";
      console.log("확인");
});

// close modal button click event
modalTitleCloseButton.addEventListener("click", () => {
    modalTitleOpen.style.display = "none";
});

// if click window: 모달 창을 제외한 화면 클릭 시 모달 창 close
window.onclick = function (event) {
  if (event.target ==  modalTitleOpen) {
    modalTitleOpen.style.display = "none";
  }
};
