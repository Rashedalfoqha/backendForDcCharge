const FAQ = require('../models/faq');

const createFAQ = async (req, res) => {
  try {
    const newFAQ = new FAQ(req.body);
    await newFAQ.save();
    res.status(201).json(newFAQ);
  } catch (error) {
    res.status(500).json({ message: "Error creating FAQ", error: error.message });
  }
};

const getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching FAQs", error: error.message });
  }
};

const updateFAQ = async (req, res) => {
  try {
    const updated = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating FAQ", error: error.message });
  }
};

const deleteFAQ = async (req, res) => {
  try {
    await FAQ.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "FAQ deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting FAQ", error: error.message });
  }
};

module.exports = { createFAQ, getAllFAQs, updateFAQ, deleteFAQ };
