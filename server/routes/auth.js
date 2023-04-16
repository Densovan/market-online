const express = require("express");
const { register, login, refresh } = require("../controllers/auth");

const router = express.Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/refresh", refresh);

module.exports = router;
