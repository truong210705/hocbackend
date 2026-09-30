const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema(
  {
    title: String,
    parent_id: {
      type: String,
      default: "",
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    deleted: {
      type: Boolean,
      default: false,
    },
    deleteAt: Date,
    slug: { type: String, slug: "title", unique: true }, //slug ăn theo tiêu đề sản phẩm và sữa trên url unique sinh sau để tránh trùng tiêu đề
  },
  {
    timestamps: { createdAt: "ngayTao", updatedAt: "ngayCapNhat" },
  },
);
const productCategory = mongoose.model(
  "product-category",
  productCategorySchema,
  "product-category",
);
module.exports = productCategory;
