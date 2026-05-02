const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const {createCustomer,
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
  updateCustomerImages,}= require('../controller/Customers');

router.post('/', auth, createCustomer);
router.get('/', getAllCustomers);
router.delete('/:id', auth, deleteCustomer);
router.put('/:id', auth, updateCustomer);
router.put('/:id/images', auth, updateCustomerImages);

module.exports = router;