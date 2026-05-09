const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');
const Invoice = require('../models/Invoice');
const Subscription = require('../models/Subscription');
const Notification = require('../models/Notification');
const ActivityLog = require('../models/ActivityLog');
const User = require('../models/userAdmin');
const Message = require('../models/messages');
const Subscriber = require('../models/subscribers');

const authentication = require('../middleware/authentication');

// GET /api/dashboard/stats
router.get('/stats', authentication, async (req, res, next) => {
    try {
        const [
            transactions,
            invoices,
            subscriptions,
            notifications,
            activities,
            users,
            messages,
            subscribers
        ] = await Promise.all([
            Transaction.find().sort({ createdAt: -1 }).limit(100).lean(),
            Invoice.find().sort({ createdAt: -1 }).limit(100).lean(),
            Subscription.find().sort({ createdAt: -1 }).limit(100).lean(),
            Notification.find().sort({ createdAt: -1 }).limit(50).lean(),
            ActivityLog.find().sort({ createdAt: -1 }).limit(50).lean(),
            User.find().lean(),
            Message.find().sort({ createdAt: -1 }).limit(50).lean(),
            Subscriber.find().lean()
        ]);

        // Aggregate data for charts
        const revenueData = await Transaction.aggregate([
            { $match: { status: 'completed' } },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    total: { $sum: "$amount" }
                }
            },
            { $sort: { _id: 1 } },
            { $limit: 30 }
        ]);

        const userGrowth = await User.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.json({
            summary: {
                totalRevenue: transactions.reduce((acc, curr) => acc + (curr.status === 'completed' ? curr.amount : 0), 0),
                totalUsers: users.length,
                activeSubscriptions: subscriptions.filter(s => s.status === 'active').length,
                pendingMessages: messages.filter(m => !m.isRead).length,
                growthRate: "+12.5%" // Mocked for now
            },
            charts: {
                revenue: revenueData,
                users: userGrowth
            },
            recentTransactions: transactions.slice(0, 10),
            recentInvoices: invoices.slice(0, 10),
            recentNotifications: notifications,
            recentActivities: activities,
            recentMessages: messages.slice(0, 5)
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
