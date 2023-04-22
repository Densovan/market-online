const express = require("express");
const verifyJWT = require("../middleware/verify-jwt");
const admin = require("../middleware/admin");
const {
  create_product,
  update_product,
  get_products,
  get_product,
  get_product_by_categorySlug,
} = require("../controllers/product");
const router = express.Router();

router.post("/product/create", verifyJWT, admin, create_product);
router.put("/product/update/:id", verifyJWT, admin, update_product);
router.get("/products", get_products);
router.get("/product/:id", get_product);
router.get("/product-category/:slug", get_product_by_categorySlug);

module.exports = router;
