// console.log("heoooooo");
const btnDelete = document.querySelectorAll("[button-delete]");

if (btnDelete) {
  const formDelete = document.querySelector("#form-delete");
  const path = formDelete.getAttribute("data-path");
  btnDelete.forEach((item) => {
    item.addEventListener("click", () => {
      const id = item.getAttribute("data-id");
      const action = path + "/" + id + "?_method=DELETE";
      formDelete.action = action;
      formDelete.submit();
    });
  });
}
