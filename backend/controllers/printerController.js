const Printer = require("../models/Printer");

// CREATE (admin only)
const createPrinter = async (req, res) => {
  try {
    const newPrinter = await Printer.create(req.body);
    res.status(201).json({
      message: "Printer created successfully",
      data: newPrinter,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ ALL (accessible aux users autorisés)
const getPrinters = async (req, res) => {
  try {
    const printers = await Printer.find();
    res.status(200).json(printers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// READ BY ID (accessible aux users autorisés)
const getPrinterById = async (req, res) => {
  try {
    const { id } = req.params;
    const printer = await Printer.findById(id);

    if (!printer) {
      return res.status(404).json({ message: "Printer not found" });
    }

    res.status(200).json(printer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePrinter = async (req, res) => {
  try {
    const updated = await Printer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Printer not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE (admin only)
const deletePrinter = async (req, res) => {
  try {
    const deleted = await Printer.deleteOne({ _id: req.params.id });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Printer not found" });
    }

    res.status(200).json({ message: "Printer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPrinter,
  getPrinters,
  getPrinterById,
  updatePrinter,
  deletePrinter,
};
