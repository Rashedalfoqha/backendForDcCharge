const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    plan: { type: String, enum: ['basic', 'premium', 'enterprise'], default: 'basic' },
    status: { type: String, enum: ['active', 'expired', 'cancelled', 'trialing'], default: 'active' },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    autoRenew: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Subscription', subscriptionSchema);
