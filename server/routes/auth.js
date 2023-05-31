const express = require("express");
const { register, login, refresh, logout } = require("../controllers/auth");

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/refresh", refresh);
router.get("/auth/logout", logout);

module.exports = router;
