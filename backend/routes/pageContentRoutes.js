const express = require('express');
const router = express.Router();
const controller = require('../controller/pageController');

router.get('/:page/:lang', controller.getPageContent);
router.post('/', controller.upsertPageContent); // You can use PUT if preferred
module.exports = router;