const Product = require("../../model/product.model");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  const product = await Product.find(find);
  res.render("admin/page/product/index", {
    title: "trang sản phẩm",
    product: product,
  });
};
