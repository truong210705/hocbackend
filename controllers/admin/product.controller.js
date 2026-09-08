const Product = require("../../model/product.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
module.exports.index = async (req, res) => {
  const filterStatus = filterStatusHelper(req.query);
  const key = searchHelper(req.query);
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
  }
  if (key.regex) {
    find.title = key.regex;
  }
  const product = await Product.find(find);
  res.render("admin/page/product/index", {
    title: "trang sản phẩm",
    product: product,
    filterStatus: filterStatus,
    keyword: key.keyword,
  });
};
