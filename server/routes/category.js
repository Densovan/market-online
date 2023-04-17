const express = require("express");
const { create_category, update_category } = require("../controllers/category");
const verifyJWT = require("../middleware/verify-jwt");
const admin = require("../middleware/admin");
const router = express.Router();

router.post("/category/create", verifyJWT, admin, create_category);
router.put("/category/update/:id", verifyJWT, admin, update_category);

module.exports = router;
