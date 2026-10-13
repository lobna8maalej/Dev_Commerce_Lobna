const express = require("express");
const router = express.Router();

const {
  createOrder,
  getUserOrders,
  getOrders,
  getOneOrder,
  updateOrder,
  deleteOrder
} = require("../controllers/orderController");

const { auth, isAdmin } = require("../middleware/auth");

// USER
router.post("/", auth, createOrder);
router.get("/my-orders", auth, getUserOrders);

// ADMIN
router.get("/", auth,isAdmin, getOrders);
router.get("/:id", auth,isAdmin, getOneOrder);
router.put("/:id", auth, updateOrder);
router.delete("/:id", auth, deleteOrder);

module.exports = router;