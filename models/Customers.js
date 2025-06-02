const mongoose = require('mongoose');

const CaptionSchema = new mongoose.Schema({
  en: { type: String, required: true },
  ar: { type: String, required: true }
}, { _id: false });

const ImageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  caption: { type: CaptionSchema, required: true }
}, { _id: false });

const TitleOrDescriptionSchema = new mongoose.Schema({
  en: { type: String, required: true },
  ar: { type: String, required: true }
}, { _id: false });

const customerSchema = new mongoose.Schema({
  title: { type: TitleOrDescriptionSchema, required: true },
  description: { type: TitleOrDescriptionSchema, required: true },
  images: {
    type: [ImageSchema],
    required: true,
    validate: {
      validator: (arr) => arr.length > 0,
      message: "Images array cannot be empty"
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Customer', customerSchema);
