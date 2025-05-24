const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controller/productServices');

// POST /api/services
router.post('/create', upload.array('images', 5), createService);

// GET all
router.get('/all', getAllServices);

// GET by ID
router.get('/all/:id', getServiceById);

// PUT update
router.put('/update/:id', upload.single('image'), updateService);

// DELETE
router.delete('/delete/:id', deleteService);

module.exports = router;
