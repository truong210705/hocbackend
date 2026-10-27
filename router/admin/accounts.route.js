const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/accounts.controller");
const validate = require("../../validates/admin/accounts.validate");
const multer = require("multer");
const uploadCloud = require("../../middleware/admin/uploadCloud.middleware");
const upload = multer();
router.get("/", controller.index);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("avatar"),
  uploadCloud.upload,
  validate.createPost,
  controller.createPost,
);
module.exports = router;
