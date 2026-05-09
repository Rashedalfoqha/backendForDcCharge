const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'DC Charge' },
  logoUrl: { type: String },
  contactEmail: { type: String },
  contactPhone: { type: String },
  address: {
    en: { type: String },
    ar: { type: String }
  },
  socialLinks: {
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    linkedin: { type: String },
    whatsapp: { type: String }
  },
  footerText: {
    en: { type: String },
    ar: { type: String }
  }
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
