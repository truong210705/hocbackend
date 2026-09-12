// start change status
const buttonChange = document.querySelectorAll("[button-change-status]");
if (buttonChange.length > 0) {
  const formchange = document.querySelector("#form-change-status");
  const path = formchange.getAttribute("data-path");
  buttonChange.forEach((button) => {
    button.addEventListener("click", () => {
      const statusData = button.getAttribute("data-status");
      const status = statusData == "active" ? "inactive" : "active";
      const id = button.getAttribute("data-id");
      const action = path + "/" + status + "/" + id + "?_method=PATCH";
      formchange.action = action;
      formchange.submit();
    });
  });
}
//end change status

//start changemultistatus
const checkboxMulti = document.querySelector("[checkbox-multi]");

if (checkboxMulti) {
  const checkall = checkboxMulti.querySelector("input[name='checkall']");
  const inputid = checkboxMulti.querySelectorAll("input[name='id']");
  console.log(inputid);
  checkall.addEventListener("click", () => {
    if (checkall.checked) {
      inputid.forEach((item) => {
        item.checked = true;
      });
    } else {
      inputid.forEach((item) => {
        item.checked = false;
      });
    }
  });
}
//end changemultistatus
