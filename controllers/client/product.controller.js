const Product = require("../../model/product.model");
module.exports.index = async (req, res) => {
  const product = await Product.find({});
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
