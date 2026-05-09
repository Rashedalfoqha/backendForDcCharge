const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { subscribe, getAllSubscribers, deleteSubscriber } = require('../controller/subscribers');

router.post('/', subscribe); // Public
router.get('/', auth, getAllSubscribers);
router.delete('/:id', auth, deleteSubscriber);

module.exports = router;
