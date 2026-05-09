const Settings = require('../models/settings');

const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
      await settings.save();
    }
    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching settings", error: error.message });
  }
};

const updateSettings = async (req, res) => {
  try {
    const updatedSettings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.status(200).json({ message: "Settings updated successfully", settings: updatedSettings });
  } catch (error) {
    res.status(500).json({ message: "Error updating settings", error: error.message });
  }
};

module.exports = {
  getSettings,
  updateSettings
};
