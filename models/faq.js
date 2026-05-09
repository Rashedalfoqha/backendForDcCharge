const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  answer: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  category: { type: String, default: 'General' },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('FAQ', faqSchema);
