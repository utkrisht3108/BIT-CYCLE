const express = require('express');
const buyController = require('../controllers/buyController');
const router = express.Router();

router.route('/').post(buyController.buyCycle);
router.route('/confirm').post(buyController.confirmCycle);
module.exports = router;
