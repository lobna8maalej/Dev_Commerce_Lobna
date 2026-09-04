const Order = require("../models/Order");

// CREATE
const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user.id,

      customer: {
        firstName: req.body.customer.firstName,
        lastName: req.body.customer.lastName,
        phone: req.body.customer.phone,
      },

      items: req.body.items,
      totalPrice: req.body.totalPrice,
      address: req.body.address,
    });

    res.status(201).json(order);
  } catch (error) {
    console.log("ORDER ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER ORDERS
const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.json(orders);
};

// GET ALL (ADMIN)

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "username email phone")
      .sort({ createdAt: -1 });

    console.log("ORDERS WITH USERS:", orders);

    res.status(200).json(orders);
  } catch (error) {
    console.error("GET ORDERS ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
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