const express = require('express');
const router = express.Router();
const { createBrand,
    getAllBrands,
    deleteBrand,
    updateBrand,
    updateBrandImages }= require('../controller/brand');

router.post('/', createBrand);

router.get('/', getAllBrands);

router.delete('/:id', deleteBrand);

router.put('/:id', updateBrand);

router.put('/:id/images', updateBrandImages); 

module.exports = router;