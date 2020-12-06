const express = require('express');
const rentController = require('../controllers/rentController');
const router = express.Router();

router.route('/').post(rentController.rentCycle);
router.route('/confirm').post(rentController.confirmCycle);
module.exports = router;
