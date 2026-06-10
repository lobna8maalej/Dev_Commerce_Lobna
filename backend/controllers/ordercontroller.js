const Order = require("../models/Order");

// CREATE
const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
   user: req.user.id, 
   items: req.body.items,
   totalPrice: req.body.totalPrice,
   address: req.body.address,
  });

    res.status(201).json(order);
  } catch (error) {
    console.log("ORDER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// GET USER ORDERS
const getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.user.id });
  res.json(orders);
};

// GET ALL (ADMIN)
const getOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

// GET ONE
const getOneOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  res.json(order);
};

// UPDATE
const updateOrder = async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(order);
};

// DELETE
const deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrders,
  getOneOrder,
  updateOrder,
  deleteOrder,
};