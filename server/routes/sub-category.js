const express = require("express");
const {
  create_subcategory,
  update_subcategory,
  get_subcategories,
  delete_subcategory,
  get_subcategory,
} = require("../controllers/sub-category");
const verifyJWT = require("../middleware/verify-jwt");
const admin = require("../middleware/admin");
const router = express.Router();

router.post("/subcategory/create", verifyJWT, admin, create_subcategory);
router.put("/subcategory/update/:id", verifyJWT, admin, update_subcategory);
router.delete("/subcategory/delete/:id", verifyJWT, admin, delete_subcategory);
router.get("/subcategories", get_subcategories);
router.get("/subcategory/:id", get_subcategory);

module.exports = router;
