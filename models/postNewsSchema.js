const mongoose = require('mongoose');
const postAndnewsSchema = new mongoose.Schema({
  language: { type: String, enum: ['en', 'ar'], required: true, index: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
  publishedDate: { type: Date, default: null, index: true },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  category: { type: String, default: null, index: true },
  imageUrl: { type: String, default: null }
}, {
  timestamps: true
});

// For sorting by createdAt frequently
postAndnewsSchema.index({ createdAt: -1 });

module.exports = mongoose.model('postNews', postAndnewsSchema);
