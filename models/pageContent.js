const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  id: { type: String, required: true }, // e.g., 'hero-1', 'stats-main'
  type: { type: String, required: true }, // e.g., 'hero', 'stats', 'features', 'cta'
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
  
  // Content (Multilingual)
  heading: {
    en: { type: String },
    ar: { type: String }
  },
  subheading: {
    en: { type: String },
    ar: { type: String }
  },
  content: {
    en: { type: String },
    ar: { type: String }
  },
  buttonText: {
    en: { type: String },
    ar: { type: String }
  },
  buttonLink: { type: String, default: '/' },
  
  // Media
  image: { type: String },
  videoUrl: { type: String },
  
  // Styling (Dynamic Config)
  config: {
    backgroundColor: { type: String },
    textColor: { type: String },
    buttonColor: { type: String },
    layout: { type: String, default: 'default' }, // 'left', 'right', 'center'
    animation: { type: String, default: 'fade-up' },
    padding: { type: String, default: 'py-24' }
  },
  
  // Custom Data (For stats, lists, etc.)
  items: [mongoose.Schema.Types.Mixed] 
}, { _id: true });

const pageSchema = new mongoose.Schema({
  page: { type: String, required: true, unique: true }, // e.g., 'home', 'about', 'contact'
  slug: { type: String, required: true, unique: true },
  metaTitle: {
    en: { type: String },
    ar: { type: String }
  },
  metaDescription: {
    en: { type: String },
    ar: { type: String }
  },
  sections: [sectionSchema]
}, { timestamps: true });

module.exports = mongoose.model('PageContent', pageSchema);
