const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadCloud = require("../../middleware/admin/uploadCloud.middleware");
// const storageMulter = require("../../helper/storageMulter");
const validate = require("../../validates/admin/product.validates");
const upload = multer();
const controller = require("../../controllers/admin/product.controller");
router.get("/", controller.index);
router.patch("/changestatus/:status/:id", controller.changestatus);
router.patch("/change-multi", controller.changesmulti);
router.delete("/delete/:id", controller.deleteProduct);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.creatPost,
  controller.createPost,
);
router.get("/edit/:id", controller.edit);
router.post(
  "/edit/:id",
  upload.single("thumbnail"),
  uploadCloud.upload,
  validate.creatPost,
  controller.editPost,
);
router.get("/detail/:id", controller.detail);
module.exports = router;
