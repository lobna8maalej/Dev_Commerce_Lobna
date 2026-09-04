const StoreSettings = require("../models/StoreSettings");

// ==========================================
// GET SETTINGS
// ==========================================
const getSettings = async (req, res) => {
  try {
    let settings = await StoreSettings.findOne();

    // Si aucun settings n'existe
    if (!settings) {
      settings = await StoreSettings.create({});
    }

    return res.status(200).json({
      success: true,
      settings,
    });

  } catch (error) {
    console.error("GET SETTINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// UPDATE SETTINGS
// ==========================================
const updateSettings = async (req, res) => {
  try {
    let settings = await StoreSettings.findOne();

    if (!settings) {
      settings = await StoreSettings.create(req.body);
    } else {
      settings = await StoreSettings.findByIdAndUpdate(
        settings._id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );
    }

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully",
      settings,
    });

  } catch (error) {
    console.error("UPDATE SETTINGS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};