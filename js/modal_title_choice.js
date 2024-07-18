const title = document.getElementById("triple_title_wrap");
const modalTitleOpen = document.getElementById("modal_title_choice_wrap");
const modalTitleCloseButton = document.getElementById(
  "modal_title_choice_close_btn"
);
// 모달 선택 버튼
const topicChoice = document.querySelectorAll(".topic_choice");
const tripleTitle = document.getElementById("triple_title");

title.addEventListener("click", () => {
  modalTitleOpen.style.display = "block";
});

// close modal button click event
modalTitleCloseButton.addEventListener("click", () => {
  modalTitleOpen.style.display = "none";
});

// if click window: 모달 창을 제외한 화면 클릭 시 모달 창 close
window.onclick = function (event) {
  if (event.target == modalTitleOpen) {
    modalTitleOpen.style.display = "none";
  }
};

topicChoice.forEach((topic) => {
  topic.addEventListener("click", (event) => {
    modalTitleOpen.style.display = "none";
    tripleTitle.textContent = event.target.textContent;
    tripleTitle.title = event.target.textContent;

    const buttonCheckboxes = document.querySelectorAll("._board_btn_input");
    const toggle = document.getElementById("toggle");
    const toggleBulb = document.querySelector("._toggle_bulb_reflections");
    const buttonLabelList = document.querySelectorAll("._board_btn_label");

    toggle.style.cursor = "default";
    toggleBulb.style.cursor = "default";
    buttonLabelList[0].style.cursor = "pointer";
    buttonLabelList[1].style.cursor = "pointer";
    buttonLabelList[2].style.cursor = "pointer";
    toggle.checked = true;

    buttonCheckboxes.forEach((button) => {
      button.checked = false;
    });
  });
});
