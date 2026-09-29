const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
// const storageMulter = require("../../helper/storageMulter");
const validate = require("../../validates/admin/product.validates");
const upload = multer();
const controller = require("../../controllers/admin/product.controller");
const PASSCLOUDDIARY = process.env.PASSCLOUDDIARY;
cloudinary.config({
  cloud_name: "ddttjfhwq",
  api_key: "929117153685727",
  api_secret: PASSCLOUDDIARY, // Click 'View API Keys' above to copy your API secret
});
router.get("/", controller.index);
router.patch("/changestatus/:status/:id", controller.changestatus);
router.patch("/change-multi", controller.changesmulti);
router.delete("/delete/:id", controller.deleteProduct);
router.get("/create", controller.create);
router.post(
  "/create",
  upload.single("thumbnail"),
  function (req, res, next) {
    if (req.file) {
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      async function upload(req) {
        let result = await streamUpload(req);
        req.body[req.file.fieldname] = result.secure_url;

        console.log(result);
        next();
      }

      upload(req);
    } else {
      next();
    }
  },
  validate.creatPost,
  controller.createPost,
);
router.get("/edit/:id", controller.edit);
router.post(
  "/edit/:id",
  upload.single("thumbnail"),
  function (req, res, next) {
    let streamUpload = (req) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            resolve(result);
          } else {
            reject(error);
          }
        });

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    async function upload(req) {
      let result = await streamUpload(req);
      console.log(result);
    }

    upload(req);
  },
  validate.creatPost,
  controller.editPost,
);
router.get("/detail/:id", controller.detail);
module.exports = router;
