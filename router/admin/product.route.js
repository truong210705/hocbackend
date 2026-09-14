const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/product.controller");
router.get("/", controller.index);
router.patch("/changestatus/:status/:id", controller.changestatus);
router.patch("/change-multi", controller.changesmulti);
router.delete("/delete/:id", controller.deleteProduct);
module.exports = router;
