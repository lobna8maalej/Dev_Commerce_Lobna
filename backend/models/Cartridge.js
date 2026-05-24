const mongoose = require("mongoose");

const cartridgeSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
    // inkjet ou toner
  },

  color: {
    type: String,
    required: true
  },

  price: {
    type: Number,
    required: true
  },

  quantity: {
    type: Number,
    required: true
  },

  image: {
    type: String
  }
});

module.exports = mongoose.model("Cartridge", cartridgeSchema);