const express = require("express");
const router = express.Router();

const {
  createPrinter,
  getPrinter,
  getPrinterById,
  linkPrinterToCartridge
} = require("../controllers/printerController");

router.post("/", createPrinter);
router.get("/", getPrinter);
router.get("/:id", getPrinterById);
router.put("/:id/link-printer", linkPrinterToCartridge);

module.exports = router;