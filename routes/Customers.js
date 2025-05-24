const express = require('express');
const router = express.Router();
const {createCustomer,
  getAllCustomers,
  deleteCustomer,
  updateCustomer,
  updateCustomerImages,}= require('../controller/Customers');

router.post('/', createCustomer);

router.get('/', getAllCustomers);

router.delete('/:id', deleteCustomer);

router.put('/:id', updateCustomer);

router.put('/:id/images', updateCustomerImages);

module.exports = router;