const express = require('express');
const router = express.Router();
const controller = require('../controller/pageController');
const auth = require('../middleware/authentication');

router.get('/all', controller.getAllPages);
router.get('/:page/:lang', controller.getPageContent);
router.post('/', auth, controller.upsertPageContent); 
router.delete('/:id', auth, controller.deletePageContent);

module.exports = router;