document.addEventListener("DOMContentLoaded", function () {
  const buttonCheckboxes = document.querySelectorAll("._board_btn_input");
  const toggle = document.getElementById("toggle");

  function checkButtons() {
    const allChecked = Array.from(buttonCheckboxes).every(
      (button) => button.checked
    );
    if (allChecked) {
      toggle.checked = false;
    } else {
      toggle.checked = true;
    }
  }

  buttonCheckboxes.forEach((button) => {
    button.addEventListener("click", function () {
      if (!this.checked) {
        event.preventDefault();
      } else {
      }
    });

    button.addEventListener("change", function () {
      checkButtons();
    });
  });

  toggle.addEventListener("click", function () {
    if (!this.checked) {
      event.preventDefault();
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
