const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  heading: String,
  content: mongoose.Schema.Types.Mixed,
  image: mongoose.Schema.Types.Mixed,
  ctaText: String,
  ctaLink: String
}, { _id: false }); 

const pageContentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  language: { type: String, enum: ['en', 'ar'], required: true },
  title: String,
  sections: [sectionSchema], // ✅ define sections properly here
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PageContent', pageContentSchema);
