const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { createMessage, getAllMessages, markAsRead, deleteMessage } = require('../controller/messages');

router.post('/', createMessage); // Public
router.get('/', auth, getAllMessages);
router.put('/:id/read', auth, markAsRead);
router.delete('/:id', auth, deleteMessage);

module.exports = router;
