const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { createGalleryItem, getAllGalleryItems, deleteGalleryItem } = require('../controller/gallery');

router.get('/', getAllGalleryItems);
router.post('/', auth, createGalleryItem);
router.delete('/:id', auth, deleteGalleryItem);

module.exports = router;
