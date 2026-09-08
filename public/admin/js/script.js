const buttonStatus = document.querySelectorAll("[button-status]");
let url = new URL(window.location.href);
if (buttonStatus.length > 0) {
  buttonStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const status = button.getAttribute("button-status");
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      window.location.href = url.href;
    });
  });
}
//end button status
// start search product
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }
    window.location.href = url.href;
  });
}
//end search product
//pagination
const buttonPage = document.querySelectorAll("[button-page]");

if (buttonPage) {
  console.log("hello");
  let url = new URL(window.location.href);
  buttonPage.forEach((button) => {
    button.addEventListener("click", () => {
      const buttonvalue = button.getAttribute("button-page");
      if (buttonvalue) {
        url.searchParams.set("page", buttonvalue);
      } else {
        url.searchParams.set("page", 1);
      }
      window.location.href = url.href;
    });
  });
}
//end pagination
