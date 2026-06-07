const express = require("express");
const router = express.Router();

const { auth, isAdmin } = require("../middleware/auth");

const {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

// USER
router.post("/", auth, createOrder);
router.get("/my", auth, getOrders); // user orders only

// ADMIN
router.get("/", auth, isAdmin, getOrders);
router.get("/:id", auth, isAdmin, getOrderById);
router.put("/:id", auth, isAdmin, updateOrder);
router.delete("/:id", auth, isAdmin, deleteOrder);

module.exports = router;


