const Partner = require('../models/partners');

const createPartner = async (req, res) => {
  try {
    const newPartner = new Partner(req.body);
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (error) {
    res.status(500).json({ message: "Error creating partner", error: error.message });
  }
};

const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: "Error fetching partners", error: error.message });
  }
};

const updatePartner = async (req, res) => {
  try {
    const updatedPartner = await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPartner);
  } catch (error) {
    res.status(500).json({ message: "Error updating partner", error: error.message });
  }
};

const deletePartner = async (req, res) => {
  try {
    await Partner.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Partner deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting partner", error: error.message });
  }
};

module.exports = { createPartner, getAllPartners, updatePartner, deletePartner };
