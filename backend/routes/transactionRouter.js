const express = require('express');
const transactionController = require('../controllers/transactionController');
const router = express.Router();

router.route('/').post(transactionController.addTransaction);
router.route("/:id").get(transactionController.sendUserTransaction);
module.exports = router;
