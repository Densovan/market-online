const express = require("express");
const admin = require("../middleware/admin");
const multer = require("multer");
const { upload_product } = require("../controllers/file-upload");
const upload = multer({ dest: "uploads/" });
const router = express.Router();
router.post(
  "/upload-product-image",
  upload.single("product_image"),
  upload_product,
  admin
);

module.exports = router;
