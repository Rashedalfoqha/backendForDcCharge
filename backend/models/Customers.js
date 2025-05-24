const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
 title: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
  description: {
    en: { type: String, required: true },
    ar: { type: String, required: true }
  },
image : { type: mongoose.Schema.Types.Mixed, required: true },

}
);
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;