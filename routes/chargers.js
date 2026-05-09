const express = require('express');
const router = express.Router();
const auth = require('../middleware/authentication');
const {
  createCharger,
  getAllChargers,
  updateCharger,
  deleteCharger
} = require('../controller/chargers');

router.get('/all', getAllChargers);
router.post('/create', auth, createCharger);
router.put('/update/:id', auth, updateCharger);
router.delete('/delete/:id', auth, deleteCharger);

module.exports = router;
