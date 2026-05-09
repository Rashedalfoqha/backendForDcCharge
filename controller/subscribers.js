const Subscriber = require('../models/subscribers');

const subscribe = async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ message: "Already subscribed" });
    const newSub = new Subscriber({ email });
    await newSub.save();
    res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json(subs);
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

const deleteSubscriber = async (req, res) => {
  try {
    await Subscriber.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Removed" });
  } catch (error) {
    res.status(500).json({ message: "Error", error: error.message });
  }
};

module.exports = { subscribe, getAllSubscribers, deleteSubscriber };
