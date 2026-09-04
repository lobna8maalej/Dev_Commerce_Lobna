const express = require("express");

const router = express.Router();

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");

const {
  auth,
  isAdmin,
} = require("../middleware/auth");

// ================= SETTINGS =================

// Récupérer les paramètres
router.get(
  "/",
  auth,
  isAdmin,
  getSettings
);

// Modifier les paramètres
router.put(
  "/",
  auth,
  isAdmin,
  updateSettings
);

module.exports = router;