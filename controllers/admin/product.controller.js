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
