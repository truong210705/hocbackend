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
    const typeChange = e.target.elements.type.value;
    if (typeChange == "delete-all") {
      const conf = confirm("bạn có chắc muốn xoá các sản phẩm này chứ");
      if (!conf) {
        return;
      }
    }
    console.log(typeChange);
    if (boxchecked.length > 0) {
      const dsid = [];
      const ids = formChangeStatus.querySelector("input[name='ids']");

      boxchecked.forEach((input) => {
        const id = input.value;
        if (typeChange == "change-position") {
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;
          const tmp = `${id}-${position}`;
          dsid.push(tmp);
          console.log(dsid);
        } else {
          dsid.push(id);
        }
      });

      ids.value = dsid.join(",");
      formChangeStatus.submit();
    } else {
      alert("hãy nhập ít nhất 1 giá trị");
    }
  });
}
//end form changemulti status

//sort
const formSelect = document.querySelector("[sort]");
if (formSelect) {
  let url = new URL(window.location.href);
  const sortSelect = formSelect.querySelector("[sort-select]");
  console.log(sortSelect);
  const sortClear = formSelect.querySelector("[sort-clear]");
  sortSelect.addEventListener("change", (e) => {
    const [sortkey, sortvalue] = e.target.value.split("-");
    url.searchParams.set("sortkey", sortkey);
    url.searchParams.set("sortvalue", sortvalue);
    window.location.href = url.href;
  });
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortkey");
    url.searchParams.delete("sortvalue");
    window.location.href = url.href;
  });
  //end sort
  //display sort selected
  const sortkey = url.searchParams.get("sortkey");
  const sortvalue = url.searchParams.get("sortvalue");
  const stringSelect = `${sortkey}-${sortvalue}`;
  console.log(stringSelect);
  const optionSelect = formSelect.querySelector(
    `option[value=${stringSelect}]`,
  );
  optionSelect.selected = true;
  //end display sort selected
}

// delete item;
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
