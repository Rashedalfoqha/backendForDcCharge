const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  language: { type: String, enum: ['en', 'ar'], required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: [{ type: String, required: true }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Service", serviceSchema);
/*const mongoose = require("mongoose");

const serviceDetailSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: mongoose.Schema.Types.Mixed, required: true },
    imageUrl: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    language: { type: String, enum: ["en", "ar"], required: true },
    page: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: mongoose.Schema.Types.Mixed,
    servicesDetails: [serviceDetailSchema],
    lastUpdated: { type: Date, default: Date.now },
    ctaText: String,
    ctaLink: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", serviceSchema);
 */