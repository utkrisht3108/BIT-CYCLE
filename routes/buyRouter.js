const express = require('express');
const buyController = require('../controllers/buyController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/').post(authController.protect, buyController.buyCycle);
router.route('/confirm').post(buyController.confirmCycle);
module.exports = router;
