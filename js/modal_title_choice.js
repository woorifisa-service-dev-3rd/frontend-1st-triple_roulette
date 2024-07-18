const title = document.getElementById("triple_title_wrap");
const modalTitleOpen = document.getElementById("modal_title_choice_wrap");
const modalTitleCloseButton = document.getElementById(
  "modal_title_choice_close_btn"
);
const textElement = document.querySelector("triple_top_outside_text");
// 모달 선택 버튼
const topicChoice = document.querySelectorAll(".topic_choice");
const tripleTitle = document.getElementById("triple_title");

title.addEventListener("click", () => {
  modalTitleOpen.style.display = "block";
  textElement.style.animation = "none"; // 애니메이션 끄기
  console.log("확인");
});

// close modal button click event
modalTitleCloseButton.addEventListener("click", () => {
  modalTitleOpen.style.display = "none";
  textElement.style.animation = ""; // 애니메이션 켜기
});

// if click window: 모달 창을 제외한 화면 클릭 시 모달 창 close
window.onclick = function (event) {
  if (event.target == modalTitleOpen) {
    modalTitleOpen.style.display = "none";
    textElement.style.animation = ""; // 애니메이션 켜기
  }
};

topicChoice.forEach((topic) => {
  topic.addEventListener("click", (event) => {
    modalTitleOpen.style.display = "none";
    tripleTitle.textContent = event.target.textContent;
  });
});
