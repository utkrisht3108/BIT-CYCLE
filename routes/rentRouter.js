const express = require('express');
const rentController = require('../controllers/rentController');
const router = express.Router();
const authController = require('../controllers/authController');

router.route('/').post(authController.protect, rentController.rentCycle);
router.route('/confirm').post(rentController.confirmCycle);
module.exports = router;
