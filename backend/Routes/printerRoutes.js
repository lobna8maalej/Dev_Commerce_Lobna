const express = require("express");

const router = express.Router();

const {
  createPrinter,
  getPrinters,
  getPrinterById,
  updatePrinter,
  deletePrinter,
} = require("../controllers/printerController");

const { auth, isAdmin } = require("../middleware/auth");

// ================= PUBLIC =================

// User + Admin peuvent voir les imprimantes
router.get("/", getPrinters);

// User + Admin peuvent voir le détail
router.get("/:id", getPrinterById);


// ================= ADMIN ONLY =================

// Ajouter une imprimante
router.post("/", auth, isAdmin, createPrinter);

// Modifier une imprimante
router.put("/:id", auth, isAdmin, updatePrinter);

// Supprimer une imprimante
router.delete("/:id", auth, isAdmin, deletePrinter);

module.exports = router;