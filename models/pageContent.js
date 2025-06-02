const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: String, required: true }
}, { _id: false });

const sectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  heading: String,
  content: mongoose.Schema.Types.Mixed,
  image: mongoose.Schema.Types.Mixed,
  ctaText: String,
  ctaLink: String,
features: {
  type: [featureSchema],
  default: []
}}, { _id: false }); 

const pageContentSchema = new mongoose.Schema({
  page: { type: String, required: true },
  language: { type: String, enum: ['en', 'ar'], required: true },
  title: String,
  sections: [sectionSchema],
  lastUpdated: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('PageContent', pageContentSchema);
