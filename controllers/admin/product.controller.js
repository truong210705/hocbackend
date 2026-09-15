const Product = require("../../model/product.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
const systemConfig = require("../../config/system");
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
  //phân trang
  const countPage = await Product.countDocuments(find);
  const objectPagination = {
    currentPage: 1,
    limitPage: 4,
  };

  const pagination = paginationHelper(objectPagination, req.query, countPage);
  // if (req.query.page) {
  //   objectPagination.currentPage = parseInt(req.query.page);
  // }
  // objectPagination.skipPage =
  //   (objectPagination.currentPage - 1) * objectPagination.limitPage;
  // const countPage = await Product.countDocuments(find);
  // objectPagination.totalPage = Math.ceil(
  //   countPage / objectPagination.limitPage,
  // );
  //end phân trang
  const product = await Product.find(find)
    .sort({ position: "asc" })
    .limit(objectPagination.limitPage)
    .skip(objectPagination.skipPage);
  res.render("admin/page/product/index", {
    title: "trang sản phẩm",
    product: product,
    filterStatus: filterStatus,
    keyword: key.keyword,
    pagination: pagination,
  });
};
module.exports.changestatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await Product.updateOne({ _id: id }, { status: status });
  req.flash("success", "thay đổi sản phẩm thành công");
  res.redirect(req.get("Referer")); // thay thế res.redirect('back) để trở về trang trước
};
module.exports.changesmulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      req.flash("success", `thay đổi thành công ${ids.length} sản phẩm`);
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      req.flash("success", `thay đổi thành công ${ids.length} sản phẩm`);
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: ids },
        { deleted: true, deleteAt: new Date() },
      );
      req.flash("success", `xoá thành công ${ids.length} sản phẩm`);
      break;
    case "change-position":
      console.log(ids);
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash("success", `thay đổi vị trí thành công ${ids.length} sản phẩm`);
      break;
    default:
      break;
  }

  res.redirect(req.get("Referer")); // thay thế res.redirect('back) để trở về trang trước
};
module.exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  await Product.updateOne(
    { _id: id },
    { deleted: true, deletedAt: new Date() },
  );
  res.redirect(req.get("Referer")); // thay thế res.redirect('back) để trở về trang trước
};
module.exports.create = async (req, res) => {
  res.render("admin/page/product/create", {
    title: "trang sản phẩm",
  });
};
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);

  if (req.body.position == "") {
    const countProducts = await Product.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }

  const product = new Product(req.body);
  await product.save();

  res.redirect(`${systemConfig.prefixadmin}/products`);
};
