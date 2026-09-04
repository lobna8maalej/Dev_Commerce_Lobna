const mongoose = require("mongoose");

const storeSettingsSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      default: "Printer Store",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    deliveryFee: {
      type: Number,
      default: 0,
    },

    freeDeliveryAbove: {
      type: Number,
      default: 0,
    },

    estimatedDelivery: {
      type: String,
      default: "2-4 days",
    },

    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Cash on Delivery + Stripe"],
      default: "Cash on Delivery",
    },

    notifications: {
      newOrder: {
        type: Boolean,
        default: true,
      },

      newReview: {
        type: Boolean,
        default: true,
      },

      lowStock: {
        type: Boolean,
        default: true,
      },

      newCustomer: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StoreSettings", storeSettingsSchema);