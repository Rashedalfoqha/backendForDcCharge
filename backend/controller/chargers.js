const charger = require("../models/charger");
const createCharger = async (req, res) => {
  try {
    const { mainTitle, title, description, imageUrl } = req.body;
    const newCharger = new charger({
      mainTitle,
      title,
      description,
      imageUrl,
    });
    await newCharger.save();
    res
      .status(201)
      .json({ message: "Charger created successfully", charger: newCharger });
  } catch (error) {
    res.status(500).json({ message: "Error creating charger", error });
  }
};
const getAllChargers = async (req, res) => {
  try {
    const chargers = await charger.find();
    res.status(200).json(chargers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching chargers", error });
  }
};
const getChargerById = async (req, res) => {
  try {
    const charger = await charger.findById(req.params.id);
    if (!charger) {
      return res.status(404).json({ message: "Charger not found" });
    }
    res.status(200).json(charger);
  } catch (error) {
    res.status(500).json({ message: "Error fetching charger", error });
  }
};

const updateCharger = async (req, res) => {
  try {
    const { mainTitle, title, description, imageUrl } = req.body;
    const updatedCharger = await charger.findByIdAndUpdate(
      req.params.id,
      { mainTitle, title, description, imageUrl },
      { new: true }
    );
    if (!updatedCharger) {
      return res.status(404).json({ message: "Charger not found" });
    }
    res
      .status(200)
      .json({ message: "Charger updated successfully", charger: updatedCharger });
  } catch (error) {
    res.status(500).json({ message: "Error updating charger", error });
  }
};

const deleteCharger = async (req, res) => {
  try {
    const deletedCharger = await charger.findByIdAndDelete(req.params.id);
    if (!deletedCharger) {
      return res.status(404).json({ message: "Charger not found" });
    }
    res.status(200).json({ message: "Charger deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting charger", error });
  }
};

module.exports = {
  createCharger,
  getAllChargers,
  getChargerById,
  updateCharger,
  deleteCharger,
};