const mongoose = require('mongoose');
const postAndnewsSchema = new mongoose.Schema({
  language: { type: String, enum: ['en', 'ar'], required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  publishedDate: { type: Date, default: null },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  category: { type: String, default: null },
  imageUrl: { type: String, default: null }
}, {
  timestamps: true
});

module.exports = mongoose.model('postNews', postAndnewsSchema);
