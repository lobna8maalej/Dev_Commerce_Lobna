const mongoose = require("mongoose");

const printerSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true
  },

  model: {
    type: String,
    required: true
  },

  type: {
    type: String
    // laser / inkjet
  },

  price: {
    type: Number,
    required: true
  },

  stock: {
    type: Number,
    required: true
  },

  image: {
    type: String
  }
});

module.exports = mongoose.model("Printer", printerSchema);