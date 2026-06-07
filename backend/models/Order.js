const mongoose = require("mongoose"); // ✅ OBLIGATOIRE

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: String,
      brand: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalPrice: Number,
  address: String,
  status: {
    type: String,
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);

