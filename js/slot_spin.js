document.addEventListener("DOMContentLoaded", () => {
  const reelsList = document.querySelectorAll(
    ".triple_middle_outside_gold_box_inner"
  );
  const btns = document.querySelectorAll(".triple_bottom_board_btn");
  const buttonCheckboxes = document.querySelectorAll("._board_btn_input");
  const toggle = document.getElementById("toggle");
  const toggleBulb = document.querySelector("._toggle_bulb_reflections");

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
          num = Math.floor(Math.random() * 14);
        }

        reel.style.backgroundImage = `url("${url}${num}.png")`;
        reel.id = num;
        reel.style.animationPlayState = "paused"; // 멈추기
        reel.style.filter = "blur(0px)";
      }, 20);
    }, 50);
  }

  // 버튼 클릭 이벤트
  btns.forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      const topicDiv = document.querySelector("#triple_title");
      const topic = topicDiv.title;
      if (topic == "주제를 선택하세요") {
        e.preventDefault();
      } else if (btn.id == -1 && !buttonCheckboxes[index].cheked) {
        e.preventDefault();
      } else {
        const reel = reelsList[index];
        btn.id = "-1";
        stopWithJerk(reel);
      }
    });
  });

  toggle.addEventListener("click", function (e) {
    if (!this.checked) {
      e.preventDefault();
    } else {
      toggle.style.cursor = "default";
      toggleBulb.style.cursor = "default";
      const buttonLabelList = document.querySelectorAll("._board_btn_label");
      buttonLabelList[0].style.cursor = "pointer";
      buttonLabelList[1].style.cursor = "pointer";
      buttonLabelList[2].style.cursor = "pointer";

      const resultArea = document.querySelector("#triple_title");
      resultArea.textContent = resultArea.title;

      reelsList.forEach((reel) => {
        reel.style.backgroundImage = url("/img/slotreel.webp");
        reel.style.filter = "blur(5px)";
        reel.style.animation = "spin 3s linear infinite";
        reel.style.animationPlayState = "running";

        btns.forEach((btn) => {
          btn.id = 0;
        });
      });
    }
  });
});
