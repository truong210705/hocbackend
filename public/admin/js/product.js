const buttonChange = document.querySelectorAll("[button-change-status]");
if (buttonChange.length > 0) {
  const formchange = document.querySelector("#form-change-status");
  const path = formchange.getAttribute("data-path");
  buttonChange.forEach((button) => {
    button.addEventListener("click", () => {
      const statusData = button.getAttribute("data-status");
      const status = statusData == "active" ? "inactive" : "active";
      const id = button.getAttribute("data-id");
      const action = path + "/" + status + "/" + id;
      formchange.action = action;
      formchange.submit();
    });
  });
}
