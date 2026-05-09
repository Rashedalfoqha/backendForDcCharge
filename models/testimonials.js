const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  position: {
    en: { type: String },
    ar: { type: String }
  },
  comment: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  imageUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
