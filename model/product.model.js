const mongoose = require("mongoose");
var slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
  {
    title: String,
    product_category_id: {
      type: String,
      default: "",
    },
    createdBy: {
      account_id: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    deletedBy: {
      account_id: String,
      deletedAt: {
        type: Date,
        default: Date.now,
      },
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { type: String, slug: "title", unique: true },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema, "Product");

module.exports = Product;
