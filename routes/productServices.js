const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const auth = require('../middleware/authentication');
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controller/productServices');

// POST /api/services
router.post('/create', auth, createService);

// GET all
router.get('/all', getAllServices);

// GET by ID
router.get('/all/:id', getServiceById);

// PUT update
router.put('/update/:id', auth, updateService);

// DELETE
router.delete('/delete/:id', auth, deleteService);

module.exports = router;
