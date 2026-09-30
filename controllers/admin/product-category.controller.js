const ProductCategory = require("../../model/product-category.model");
const systemConfig = require("../../config/system");
const searchHelper = require("../../helper/search");
const filterStatusHelper = require("../../helper/filterStatus");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };
  //tìm kiếm
  const keyword = searchHelper(req.query);
  if (keyword.regex) {
    find.title = keyword.regex;
  }
  //end tìm kiếm
  if (req.query.status) {
    find.status = req.query.status;
  }
  const filterStatus = filterStatusHelper(req.query);
  const category = await ProductCategory.find(find);
  console.log(category);
  res.render("admin/page/product-category/index", {
    title: "Danh mục sản phẩm",
    category: category,
    key: keyword.keyword,
    filterStatus,
  });
};
module.exports.create = async (req, res) => {
  res.render("admin/page/product-category/create", {
    title: "Danh mục sản phẩm",
  });
};
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const count = await ProductCategory.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const category = new ProductCategory(req.body);
  await category.save();

  res.redirect(`${systemConfig.prefixadmin}/product-category`);
};
