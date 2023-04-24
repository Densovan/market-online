const express = require("express");
const verifyJWT = require("../middleware/verify-jwt");
const admin = require("../middleware/admin");
const {
  create_product,
  update_product,
  get_products,
  get_product,
  get_product_by_categorySlug,
  search_products,
  filter_products,
  similar_product,
} = require("../controllers/product");
const router = express.Router();

router.post("/product/create", verifyJWT, admin, create_product);
router.put("/product/update/:id", verifyJWT, admin, update_product);
router.get("/products", get_products);
router.get("/product/:id", get_product);
router.get("/product-category/:slug", get_product_by_categorySlug);
router.get("/product-search/:keyword", search_products);
router.post("/proudcts-filter", filter_products);
router.get("/product-similar", similar_product);

module.exports = router;
