const express = require("express");

const router = express.Router();

const {
  getSalesOverview,
} = require("../controllers/salesController");

const {
  auth,
  isAdmin,
} = require("../middleware/auth");

// ================= SALES & ANALYTICS =================

router.get(
  "/overview",
  auth,
  isAdmin,
  getSalesOverview
);

module.exports = router;