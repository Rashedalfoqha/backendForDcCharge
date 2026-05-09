const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    invoiceNumber: { type: String, required: true, unique: true },
    amount: { type: Number, required: true },
    tax: { type: Number, default: 0 },
    total: { type: Number, required: true },
    status: { type: String, enum: ['paid', 'unpaid', 'overdue', 'cancelled'], default: 'unpaid' },
    dueDate: { type: Date, required: true },
    items: [{
        description: String,
        quantity: Number,
        price: Number
    }]
}, { timestamps: true });

module.exports = mongoose.model('Invoice', invoiceSchema);
