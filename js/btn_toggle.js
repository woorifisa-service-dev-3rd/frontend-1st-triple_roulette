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

  function stopWithJerk(reel) {
    // 애니메이션 일시 중지
    reel.style.animationPlayState = "paused";
    reel.style.animation = "none"; // 기존 애니메이션 제거
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
    let jackpotTest = "/img/topic/";
    let num = -1;

    const nameList = [
      "강세필",
      "강재연",
      "강현우",
      "공예진",
      "곽지은",
      "구자빈",
      "기남석",
      "길가은",
      "김민지",
      "김창영",
      "김호철",
      "박서연",
      "방성경",
      "신원섭",
      "안찬웅",
      "오선민",
      "유승아",
      "유정호-1",
      "유정호-2",
      "유정호-3",
      "유정호",
      "이명렬",
      "이성희",
      "이현아",
      "임지혁",
      "정석진",
      "조예은",
      "최윤정",
      "황순범",
    ];

    if (topic == topicList[0]) {
      url += "00_";
      num = Math.floor(Math.random() * 15);
      url += num;
      jackpotTest += "00_0";
      reel.id = num;
    } else {
      let idx = Math.floor(Math.random() * 29);
      url += nameList[idx];
      jackpotTest += "유정호";
      if(idx == 17 || idx == 18 || idx == 19 || idx == 20) reel.id = "유정호";
      else reel.id = nameList[idx];
      // reel.id = 1;
    }

    // reel.id = 1;

    reel.style.backgroundImage = `url("${url}.png")`;
    // reel.style.backgroundImage = `url("${jackpotTest}.png")`;
    reel.style.animationPlayState = "paused"; // 멈추기
    reel.style.filter = "blur(0px)";
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
        const topicDiv = document.querySelector("#triple_title");
        const topic = topicDiv.title;
        let num = "";
        if (
          topic != "당신의 미래에 배우자는?" &&
          topic != "주제를 선택하세요"
        ) {
          num += "02";
        }

        reel.style.backgroundImage = `url("/img/slotreel${num}.png")`;
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
