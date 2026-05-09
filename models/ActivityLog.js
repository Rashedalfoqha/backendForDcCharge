const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
    action: { type: String, required: true },
    module: { type: String, required: true },
    details: { type: String },
    ip: { type: String },
    userAgent: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ActivityLog', activityLogSchema);
