const Product = require("../../model/product.model");
module.exports.index = async (req, res) => {
  //button status start
  let filterStatus = [
    {
      name: "Tất cả",
      status: "",
      class: "",
    },
    {
      name: "Hoạt động",
      status: "active",
      class: "",
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: "",
    },
  ];
  if (req.query.status) {
    const index = filterStatus.findIndex(
      (index) => index.status == req.query.status,
    );
    filterStatus[index].class = "active";
  } else {
    const index = filterStatus.findIndex((index) => index.status == "");
    filterStatus[index].class = "active";
  }

  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  //button status start end
  if (req.query.keyword) {
    find.title = req.query.keyword;
  }
  const product = await Product.find(find);
  res.render("admin/page/product/index", {
    title: "trang sản phẩm",
    product: product,
    filterStatus: filterStatus,
  });
};
