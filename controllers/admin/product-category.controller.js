const ProductCategory = require("../../model/product-category.model");
const systemConfig = require("../../config/system");
module.exports.index = async (req, res) => {
  const find = {
    deleted: false,
  };

  const category = await ProductCategory.find(find);
  console.log(category);
  res.render("admin/page/product-category/index", {
    title: "Danh mục sản phẩm",
    category: category,
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
