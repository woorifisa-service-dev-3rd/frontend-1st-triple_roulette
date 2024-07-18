const title = document.getElementById("triple_title_wrap");
const modalTitleOpen = document.getElementById("modal_title_choice_wrap");
const modalTitleCloseButton = document.getElementById(
  "modal_title_choice_close_btn"
);
const textElement = document.querySelector(".triple_top_outside_text");
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
    const buttonLabelList = document.querySelectorAll(
      ".triple_bottom_board_btn"
    );

    toggle.style.cursor = "default";
    toggleBulb.style.cursor = "default";
    buttonLabelList[0].style.cursor = "pointer";
    buttonLabelList[1].style.cursor = "pointer";
    buttonLabelList[2].style.cursor = "pointer";
    toggle.checked = true;

    const reelsList = document.querySelectorAll(
      ".triple_middle_outside_gold_box_inner"
    );

    reelsList.forEach((reel) => {
      reel.style.backgroundImage = `url("/img/slotreel.webp")`;
      reel.style.filter = "blur(5px)";
      reel.style.animation = "spin 3s linear infinite";
      reel.style.animationPlayState = "running";
    });
  });
});
