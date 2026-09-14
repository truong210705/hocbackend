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

  inputid.forEach((check) => {
    check.addEventListener("click", () => {
      const countchecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked",
      );
      console.log(countchecked.length);
      if (countchecked.length == inputid.length) {
        checkall.checked = true;
      } else {
        checkall.checked = false;
      }
    });
  });
}
//end changemultistatus
// start form changemulti status
const formChangeStatus = document.querySelector("[form-change-multi]");
if (formChangeStatus) {
  formChangeStatus.addEventListener("submit", (e) => {
    e.preventDefault();
    const checkboxMulti = document.querySelector("[checkbox-multi]");

    const boxchecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked",
    );
    if (boxchecked.length > 0) {
      const dsid = [];
      const ids = formChangeStatus.querySelector("input[name='ids']");
      console.log(ids);
      boxchecked.forEach((input) => {
        const id = input.value;
        dsid.push(id);
      });
      console.log(dsid.join(","));
      ids.value = dsid.join(",");
      formChangeStatus.submit();
    } else {
      alert("hãy nhập ít nhất 1 giá trị");
    }
  });
}
//end form changemulti status
//delete item
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete) {
  const formDelete = document.querySelector("#form-delete-item");
  const path = formDelete.getAttribute("data-path");
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");

      const action = path + `/${id}?_method=DELETE`;
      formDelete.action = action;
      formDelete.submit();
    });
  });
}
//end delete item
