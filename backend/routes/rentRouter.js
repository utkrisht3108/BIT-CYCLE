const express = require('express');
const rentController = require('../controllers/rentController');
const router = express.Router();

router.route('/').post(rentController.rentCycle);

module.exports = router;
