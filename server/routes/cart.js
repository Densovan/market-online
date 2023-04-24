const express = require("express");
const verifyJWT = require("../middleware/verify-jwt");
const { add_cart, delete_cart, get_carts } = require("../controllers/cart");
const router = express.Router();

router.post("/add_cart", verifyJWT, add_cart);
router.delete("/delete_cart/:id", verifyJWT, delete_cart);
router.get("/get_carts", verifyJWT, get_carts);
module.exports = router;
