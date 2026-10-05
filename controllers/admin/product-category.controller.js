const ProductCategory = require("../../model/product-category.model");
const systemConfig = require("../../config/system");
const searchHelper = require("../../helper/search");
const filterStatusHelper = require("../../helper/filterStatus");
const createTreeHelper = require("../../helper/createTree");
const productCategory = require("../../model/product-category.model");
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

  const newCate = createTreeHelper(category);
  console.log(newCate);
  res.render("admin/page/product-category/index", {
    title: "Danh mục sản phẩm",
    category: newCate,
    key: keyword.keyword,
    filterStatus,
  });
};
module.exports.create = async (req, res) => {
  //tree
  const find = {
    deleted: false,
  };
  const category = await ProductCategory.find(find);
  const newCate = createTreeHelper(category);
  console.log(newCate);
  //end tree
  res.render("admin/page/product-category/create", {
    title: "Danh mục sản phẩm",
    category: newCate,
  });
};
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const count = await ProductCategory.countDocuments();
    req.body.position = count + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const category = new ProductCategory(req.body);
  await category.save();
  req.flash("success", `thêm danh mục thành công`);
  res.redirect(`${systemConfig.prefixadmin}/product-category`);
};
module.exports.changestatus = async (req, res) => {
  try {
    if (req.params.status && req.params.id) {
      await productCategory.updateOne(
        { _id: req.params.id },
        { status: req.params.status },
      );
      req.flash("success", `chỉnh sửa trạng thái thành công`);
      res.redirect(`${systemConfig.prefixadmin}/product-category`);
    } else {
      return;
    }
  } catch (err) {
    req.flash("error", `chỉnh sửa trạng thất bại`);
    res.redirect(`${systemConfig.prefixadmin}/product-category`);
  }
};
