const mongoose = require('mongoose');

const brandSchema  = new mongoose.Schema({
   title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
    image : { type: mongoose.Schema.Types.Mixed, required: true },
});

// Optional: index titles to speed up listings/searches by title
brandSchema.index({ 'title.en': 1 });
brandSchema.index({ 'title.ar': 1 });

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
