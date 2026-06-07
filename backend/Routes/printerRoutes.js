const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middleware/auth");

const {
  createPrinter,
  getPrinters,
  getPrinterById,
  updatePrinter,
  deletePrinter,
} = require("../controllers/printerController");

// ================= CREATE PRINTER =================
// admin seulement
router.post("/", auth, isAdmin, createPrinter);

// ================= GET ALL PRINTERS =================
// utilisateur connecté
router.get("/", auth, getPrinters);

// ================= GET PRINTER BY ID =================
router.get("/:id", auth, getPrinterById);

// ================= UPDATE PRINTER =================
router.put("/:id", auth, isAdmin, updatePrinter);

// ================= DELETE PRINTER =================
router.delete("/:id", auth, isAdmin, deletePrinter);

module.exports = router;