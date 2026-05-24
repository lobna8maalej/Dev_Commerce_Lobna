const express = require("express");
const router = express.Router();

const {
  createCartridge,
  getCartridge,
  updateCartridge,
  deleteCartridge,
  getCartridgeById,
  linkPrinterToCartridge,
} = require("../controllers/cartridgeController");

router.post("/", createCartridge);
router.get("/", getCartridge);
router.get("/:id", getCartridgeById);
router.put("/:id", updateCartridge);
router.put("/:id/link-printer", linkPrinterToCartridge);
router.delete("/:id", deleteCartridge);

module.exports = router;