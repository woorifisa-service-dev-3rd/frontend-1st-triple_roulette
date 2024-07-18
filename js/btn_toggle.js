import { gameResultCheck } from "./game_result.js";

document.addEventListener("DOMContentLoaded", function () {
  const buttonCheckboxes = document.querySelectorAll("._board_btn_input");
  const toggle = document.getElementById("toggle");
  const toggleBulb = document.querySelector("._toggle_bulb_reflections");
  const buttonLabelList = document.querySelectorAll("._board_btn_label");

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

  buttonCheckboxes.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (!this.checked) {
        e.preventDefault();
      } else {
        console.log(e.target);
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
