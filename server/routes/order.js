const express = require("express");
const verifyJWT = require("../middleware/verify-jwt");
const admin = require("../middleware/admin");
const { create_order, update_order } = require("../controllers/order");
const router = express.Router();

router.post("/create_order", verifyJWT, create_order);
router.put("/update_order", verifyJWT, admin, update_order);

module.exports = router;
