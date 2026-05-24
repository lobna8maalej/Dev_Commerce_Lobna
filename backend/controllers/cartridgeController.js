const Cartridge = require("../models/Cartridge");
const Printer = require("../models/Printer");
const mongoose = require("mongoose");

// CREATE
const createCartridge = async (req, res) => {
  try {
    const newCartridge = await Cartridge.create(req.body);

    res.status(201).json({
      message: "Cartridge created",
      data: newCartridge,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getCartridge = async (req, res) => {
  try {
    const cartridges = await Cartridge.find();
    res.status(200).json(cartridges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCartridgeById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "id");

    const cartridge = await Cartridge.findById(id);
    console.log(cartridge, "data");

    if (!cartridge) {
      return res.status(404).json({ message: "Cartridge not found" });
    }

    res.status(200).json(cartridge);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateCartridge = async (req, res) => {
  try {
    const cartridgeData = await Cartridge.findById(req.params.id);

    if (!cartridgeData) {
      return res.status(404).json({ message: "Cartridge not found" });
    }

    cartridgeData.brand = req.body.brand;
    cartridgeData.type = req.body.type;
    cartridgeData.color = req.body.color;
    cartridgeData.price = req.body.price;
    cartridgeData.quantity = req.body.quantity;
    cartridgeData.image = req.body.image;

    await cartridgeData.save();

    res.status(200).json({
      message: "Cartridge updated successfully",
      cartridge: cartridgeData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const linkPrinterToCartridge = async (req, res) => {
  try {
    const { printerId } = req.body;

    if (!printerId) {
      return res.status(400).json({ message: "printerId is required" });
    }

    const cartridgeData = await Cartridge.findById(req.params.id);
    if (!cartridgeData) {
      return res.status(404).json({ message: "Cartridge not found" });
    }

    const printer = await Printer.findById(printerId);
    if (!printer) {
      return res.status(404).json({ message: "Printer not found" });
    }

    printer.cartridge = cartridgeData._id;
    await printer.save();

    res.status(200).json({
      message: "Printer linked to cartridge successfully",
      printer,
      cartridge: cartridgeData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCartridge = async (req, res) => {
  try {
    const deleted = await Cartridge.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Cartridge not found" });
    }

    res.status(200).json({ message: "Cartridge supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCartridge,
  getCartridge,
  getCartridgeById,
  updateCartridge,
  linkPrinterToCartridge,
  deleteCartridge,
};