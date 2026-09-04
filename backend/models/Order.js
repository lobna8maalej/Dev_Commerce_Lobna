const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Informations du client pour la livraison
    customer: {
      firstName: {
        type: String,
        required: true,
      },

      lastName: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },
    },

    items: [
      {
        printer: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Printer",
          required: true,
        },

        quantity: {
          type: Number,
          default: 1,
        },

        priceAtPurchase: {
          type: Number,
          required: true,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    orderStatus: {
  type: String,
  enum: [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled"
  ],
  default: "pending",
},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);