const express = require("express");
const router = express.Router();

const authorize = require("../middleware/authorize");

const {
  createPrinter,
  getPrinter,
  getPrinterById,
} = require("../controllers/printerController");
router.post("/", authorize, createPrinter);
router.get("/", authorize, getPrinter);
router.get("/:id", authorize, getPrinterById);


module.exports = router;