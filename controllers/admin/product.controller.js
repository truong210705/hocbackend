const Product = require("../../model/product.model");
const filterStatusHelper = require("../../helper/filterStatus");
const searchHelper = require("../../helper/search");
const paginationHelper = require("../../helper/pagination");
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
  res.redirect(req.get("Referer")); // thay thế res.redirect('back) để trở về trang trước
};
module.exports.changesmulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(",");
  switch (type) {
    case "active":
      await Product.updateMany({ _id: { $in: ids } }, { status: "active" });
      break;
    case "inactive":
      await Product.updateMany({ _id: { $in: ids } }, { status: "inactive" });
      break;
    case "delete-all":
      await Product.updateMany(
        { _id: ids },
        { deleted: true, deleteAt: new Date() },
      );
      break;
    case "change-position":
      console.log(ids);
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await Product.updateOne({ _id: id }, { position: position });
      }
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
