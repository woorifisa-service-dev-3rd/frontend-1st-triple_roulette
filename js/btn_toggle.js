import { gameResultCheck } from "./game_result.js";

document.addEventListener("DOMContentLoaded", function () {
  const buttonCheckboxes = document.querySelectorAll("._board_btn_input");
  const toggle = document.getElementById("toggle");
  const toggleBulb = document.querySelector("._toggle_bulb_reflections");
  const buttonLabelList = document.querySelectorAll("._board_btn_label");
  const reelsList = document.querySelectorAll(
    ".triple_middle_outside_gold_box_inner"
  );

  // 모든 릴을 무한히 회전시키기
  reelsList.forEach((reel) => {
    reel.style.animationPlayState = "running";
  });

  // 덜컹거리면서 멈추는 효과
  function stopWithJerk(reel) {
    // 애니메이션 일시 중지
    reel.style.animationPlayState = "paused";

    // 잠시 후 다시 재생 후 멈추기
    setTimeout(() => {
      reel.style.animation = "none"; // 기존 애니메이션 제거
      // 잠시 후 다시 애니메이션 추가
      setTimeout(() => {
        reel.style.animation = "spin 0.2s ease-out"; // 짧은 시간 동안 느리게 회전

        const topicList = [
          "당신의 미래에 배우자는?",
          "당신의 미래에 직업은?",
          "숨겨둔 자산이 가장 많은 사람은?",
          "연애를 가장 많이 한 사람은?",
          "닮은 사람은?",
        ];

        const topicDiv = document.querySelector("#triple_title");
        const topic = topicDiv.title;
        let url = "/img/topic/";
        let num = -1;

        if (topic == topicList[0]) url += "00_";
        else if (topic == topicList[1]) url += "01_";
        else if (topic == topicList[2]) {
          url += "02_";
          num = Math.floor(Math.random() * 34);
        } else if (topic == topicList[3]) {
          url += "03_";
          num = Math.floor(Math.random() * 34);
        } else if (topic == topicList[4]) url += "04_";

        if (num == -1) {
          num = Math.floor(Math.random() * 15);
        }

        // reel.style.backgroundImage = `url("${url}${num}.png")`;
        reel.style.backgroundImage = `url("${url}1.png")`;
        // reel.id = num;
        reel.id = 1;
        reel.style.animationPlayState = "paused"; // 멈추기
        reel.style.filter = "blur(0px)";
      }, 20);
    }, 50);
  }

  function checkButtons() {
    const allChecked = Array.from(buttonCheckboxes).every(
      (button) => button.checked
    );
    if (allChecked) {
      toggle.checked = false;
      toggle.style.cursor = "pointer";
      toggleBulb.style.cursor = "pointer";

      buttonLabelList[0].style.cursor = "default";
      buttonLabelList[1].style.cursor = "default";
      buttonLabelList[2].style.cursor = "default";

      gameResultCheck();
    } else {
      toggle.checked = true;
    }
  }

  buttonCheckboxes.forEach((button, index) => {
    button.addEventListener("click", function (e) {
      const topic = document.querySelector("#triple_title");
      if (topic.title === "주제를 선택하세요") {
        e.preventDefault();
      } else if (!this.checked) {
        e.preventDefault();
      } else {
        const reel = reelsList[index];
        stopWithJerk(reel);
      }
    });

    button.addEventListener("change", function () {
      checkButtons();
    });
  });

  toggle.addEventListener("click", function (e) {
    if (!this.checked) {
      e.preventDefault();
    } else {
      toggle.style.cursor = "default";
      toggleBulb.style.cursor = "default";
      buttonLabelList[0].style.cursor = "pointer";
      buttonLabelList[1].style.cursor = "pointer";
      buttonLabelList[2].style.cursor = "pointer";

      const resultArea = document.querySelector("#triple_title");
      resultArea.textContent = resultArea.title;

      console.log(reelsList);
      reelsList.forEach((reel) => {
        reel.style.backgroundImage = `url("/img/slotreel.webp")`;
        reel.style.filter = "blur(5px)";
        reel.style.animation = "spin 3s linear infinite";
        reel.style.animationPlayState = "running";
      });
    }
  });

  toggle.addEventListener("change", function () {
    if (this.checked) {
      buttonCheckboxes.forEach((button) => {
        button.checked = false;
      });
    }
  });

  checkButtons();
});
