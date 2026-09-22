const Product = require("../../model/product.model");
module.exports.index = async (req, res) => {
  const product = await Product.find({ deleted: false, status: "active" });
  console.log(product);
  product.forEach((item) => {
    item.priceNew = (
      item.price -
      (item.price * item.discountPercentage) / 100
    ).toFixed(0);
  });
  res.render("clients/page/products/index", {
    title: "trang sản phẩm",
    product: product,
  });
};
module.exports.detail = async (req, res) => {
  console.log(req.params.slug);
  const find = {
    deleted: false,
    status: "active",
    slug: req.params.slug,
  };
  const product = await Product.findOne(find);
  res.render("clients/page/products/detail", {
    title: "chi tiết sản phẩm",
    product: product,
  });
};
