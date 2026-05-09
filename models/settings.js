const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  label: { en: String, ar: String },
  link: String,
  order: Number,
  isExternal: { type: Boolean, default: false },
  children: [{ label: { en: String, ar: String }, link: String }]
});

const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'DC Charge' },
  logoUrl: { type: String },
  faviconUrl: { type: String },
  
  // Navigation
  mainMenu: [menuItemSchema],
  footerMenu: [menuItemSchema],
  
  // Theme (Full Control)
  theme: {
    primaryColor: { type: String, default: '#16a34a' },
    secondaryColor: { type: String, default: '#1e293b' },
    accentColor: { type: String, default: '#fbbf24' },
    fontFamily: { type: String, default: 'Inter' },
    darkMode: { type: Boolean, default: true }
  },
  
  // Contact & Social
  contactEmail: String,
  contactPhone: String,
  address: { en: String, ar: String },
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    linkedin: String,
    whatsapp: String,
    youtube: String
  },
  
  // Scripts & Analytics
  googleAnalyticsId: String,
  facebookPixelId: String,
  customHeadScripts: String
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
