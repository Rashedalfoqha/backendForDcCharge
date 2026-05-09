const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const { createPartner, getAllPartners, updatePartner, deletePartner } = require('../controller/partners');

router.get('/', getAllPartners);
router.post('/', auth, createPartner);
router.put('/:id', auth, updatePartner);
router.delete('/:id', auth, deletePartner);

module.exports = router;
