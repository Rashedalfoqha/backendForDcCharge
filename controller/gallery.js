const Gallery = require('../models/gallery');

const createGalleryItem = async (req, res) => {
  try {
    const newItem = new Gallery(req.body);
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getAllGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = { createGalleryItem, getAllGalleryItems, deleteGalleryItem };
