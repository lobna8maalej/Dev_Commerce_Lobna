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

// ================= PUBLIC (user connecté) =================
router.get("/", auth, getPrinters);
router.get("/:id", auth, getPrinterById);

// ================= ADMIN ONLY =================
router.post("/", auth, isAdmin, createPrinter);
router.put("/:id", auth, isAdmin, updatePrinter);
router.delete("/:id", auth, isAdmin, deletePrinter);

module.exports = router;