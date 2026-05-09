const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  title: {
    en: { type: String },
    ar: { type: String }
  },
  imageUrl: { type: String, required: true },
  category: { type: String, default: 'General' }
}, { timestamps: true });

module.exports = mongoose.model('Gallery', gallerySchema);
