const Printer = require("../models/Printer");

const createPrinter = async (req, res) => {
  try {
    const newPrinter = await Printer.create(req.body);
    res.status(201).json({
      message: "Printer created",
      data: newPrinter,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrinter = async (req, res) => {
  try {
    const printers = await Printer.find();
    res.status(200).json(printers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrinterById = async (req, res) => {
  try {
    const printer = await Printer.findById(req.params.id);

    if (!printer) {
      return res.status(404).json({ message: "Printer not found" });
    }

    res.status(200).json(printer);
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
module.exports = {
  createPrinter,
  getPrinter,
  getPrinterById,
linkPrinterToCartridge
};