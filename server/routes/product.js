const express = require("express");
const verifyJWT = require("../middleware/verify-jwt");
const admin = require("../middleware/admin");
const { create_product, update_product } = require("../controllers/product");
const router = express.Router();

router.post("/product/create", verifyJWT, admin, create_product);
router.put("/product/update/:id", verifyJWT, admin, update_product);

module.exports = router;
