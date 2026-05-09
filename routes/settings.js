const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { getSettings, updateSettings } = require('../controller/settings');

router.get('/', getSettings);
router.put('/', auth, updateSettings);

module.exports = router;
