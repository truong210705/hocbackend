const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadCloud = require("../../middleware/admin/uploadCloud.middleware");
const validate = require("../../validates/admin/product.validates");
const upload = multer();
const controller = require("../../controllers/admin/product-category.controller");
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.creatPost,
  controller.createPost,
);
module.exports = router;
