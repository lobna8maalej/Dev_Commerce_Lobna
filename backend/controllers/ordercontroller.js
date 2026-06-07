const Order = require("../models/Order");
const Printer = require("../models/Printer");
const mongoose = require("mongoose");

// CREATE
const createOrder = async (req, res) => {
  try {
    const { items, totalPrice, address } = req.body;

    const order = new Order({
      userId: req.user.id,
      items,
      totalPrice,
      address,
      status: "pending"
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lire toutes les commandes
const getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === "admin") {
      orders = await Order.find();
    } else {
      orders = await Order.find({ userId: req.user.id });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// READ BY ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "email name");

    if (!order) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateOrder = async (req, res) => {
  try {
    const orderData = await Order.findById(req.params.id);

    if (!orderData) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    orderData.status = req.body.status || orderData.status;
    orderData.deliveryInfo = req.body.deliveryInfo || orderData.deliveryInfo;

    await orderData.save();

    res.status(200).json({
      message: "Commande mise à jour avec succès",
      order: orderData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Commande introuvable" });
    }

    res.status(200).json({ message: "Commande supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};
