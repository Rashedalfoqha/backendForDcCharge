const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now(),
        services: {
            database: mongoose.connection.readyState === 1 ? 'UP' : 'DOWN',
        }
    };
    try {
        res.send(healthcheck);
    } catch (e) {
        healthcheck.message = e;
        res.status(503).send();
    }
});

module.exports = router;
