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

const Brand = mongoose.model('Brand', brandSchema);
module.exports = Brand;
