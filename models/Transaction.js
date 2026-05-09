const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: 'JOD' },
    status: { type: String, enum: ['completed', 'pending', 'failed', 'refunded'], default: 'completed' },
    type: { type: String, enum: ['charging', 'subscription', 'hardware', 'service'], required: true },
    paymentMethod: { type: String, enum: ['credit_card', 'paypal', 'apple_pay', 'bank_transfer'], default: 'credit_card' },
    description: { type: String },
    reference: { type: String, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
