const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { createBrand,
    getAllBrands,
    deleteBrand,
    updateBrand,
    updateBrandImages }= require('../controller/brand');

router.post('/', auth, createBrand);
router.get('/', getAllBrands);
router.delete('/:id', auth, deleteBrand);
router.put('/:id', auth, updateBrand);
router.put('/:id/images', auth, updateBrandImages); 

module.exports = router;