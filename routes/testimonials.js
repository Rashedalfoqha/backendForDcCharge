const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { createTestimonial, getAllTestimonials, updateTestimonial, deleteTestimonial } = require('../controller/testimonials');

router.get('/', getAllTestimonials);
router.post('/', auth, createTestimonial);
router.put('/:id', auth, updateTestimonial);
router.delete('/:id', auth, deleteTestimonial);

module.exports = router;
