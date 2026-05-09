const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { createFAQ, getAllFAQs, updateFAQ, deleteFAQ } = require('../controller/faq');

router.get('/', getAllFAQs);
router.post('/', auth, createFAQ);
router.put('/:id', auth, updateFAQ);
router.delete('/:id', auth, deleteFAQ);

module.exports = router;
