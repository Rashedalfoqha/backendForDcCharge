const mongoose = require("mongoose");

const chargersSchema = new mongoose.Schema({
  language: { type: String, enum: ['en', 'ar'], required: true },
  mainTitle: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Charger", chargersSchema);