//permission

const table = document.querySelector("[table-permission]");
if (table) {
  const submitPermis = document.querySelector("[button-submit]");

  submitPermis.addEventListener("click", () => {
    const permission = [];
    const row = table.querySelectorAll("[data-name]");
    row.forEach((item) => {
      const name = item.getAttribute("data-name");
      const inputs = item.querySelectorAll("input");
      console.log(name);
      if (name == "id") {
        inputs.forEach((input) => {
          const id = input.value; //id quyền
          permission.push({
            id: id,
            permission: [],
          });
        });
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked;
          //   console.log(name);
          //   console.log(index);
          //   console.log(checked);
          if (checked) {
            permission[index].permission.push(name); // ghi nhớ dữ liệu sẽ đi từ trên xuống id quyền 1 , id quyền 2, checked quyền 1 checked quyền 2
          }
        });
      }
    });
    if (permission.length > 0) {
      const formPermis = document.querySelector("#form-change-permissions");
      const textPermis = document.querySelector("input[name='permissions']");
      console.log(textPermis);
      textPermis.value = JSON.stringify(permission);
      formPermis.submit();
    }
  });
}
//end permission
