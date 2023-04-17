const express = require("express");
const { get_users, get_user } = require("../controllers/user");
const verifyJWT = require("../middleware/verify-jwt");
const admin = require("../middleware/admin");
const router = express.Router();

router.get("/users", verifyJWT, admin, get_users);
router.get("/user", verifyJWT, get_user);

module.exports = router;
