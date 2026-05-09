const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, default: 'section' },
  heading: { type: String },
  content: { type: mongoose.Schema.Types.Mixed }, // String or Array
  image: { type: mongoose.Schema.Types.Mixed }, // String or Array
  ctaText: { type: String },
  ctaLink: { type: String },
  features: [mongoose.Schema.Types.Mixed],
  items: [mongoose.Schema.Types.Mixed]
}, { _id: true });

const pageSchema = new mongoose.Schema({
  page: { type: String, required: true }, // e.g., 'home'
  language: { type: String, required: true }, // e.g., 'en'
  slug: { type: String, required: true },
  title: { type: String },
  sections: [sectionSchema],
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

// Ensure unique combination of page and language
pageSchema.index({ page: 1, language: 1 }, { unique: true });

module.exports = mongoose.model('PageContent', pageSchema);
