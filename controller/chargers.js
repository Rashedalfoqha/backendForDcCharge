const Charger = require('../models/chargers');

const createCharger = async (req, res) => {
  try {
    const { language, mainTitle, title, description, imageUrl } = req.body;
    const newCharger = new Charger({ language, mainTitle, title, description, imageUrl });
    await newCharger.save();
    res.status(201).json({ message: "Charger created successfully", charger: newCharger });
  } catch (error) {
    res.status(500).json({ message: "Error creating charger", error: error.message });
  }
};

const getAllChargers = async (req, res) => {
  try {
    const chargers = await Charger.find().sort({ createdAt: -1 });
    res.status(200).json(chargers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chargers", error: error.message });
  }
};

const updateCharger = async (req, res) => {
  try {
    const { language, mainTitle, title, description, imageUrl } = req.body;
    const updatedCharger = await Charger.findByIdAndUpdate(
      req.params.id,
      { language, mainTitle, title, description, imageUrl },
      { new: true }
    );
    if (!updatedCharger) return res.status(404).json({ message: "Charger not found" });
    res.status(200).json({ message: "Charger updated successfully", charger: updatedCharger });
  } catch (error) {
    res.status(500).json({ message: "Error updating charger", error: error.message });
  }
};

const deleteCharger = async (req, res) => {
  try {
    const deletedCharger = await Charger.findByIdAndDelete(req.params.id);
    if (!deletedCharger) return res.status(404).json({ message: "Charger not found" });
    res.status(200).json({ message: "Charger deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting charger", error: error.message });
  }
};

module.exports = {
  createCharger,
  getAllChargers,
  updateCharger,
  deleteCharger
};