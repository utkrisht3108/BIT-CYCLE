const express = require('express');
const transactionController = require('../controllers/transactionController');
const authController = require('../controllers/authController');
const router = express.Router();

router.route('/').post(transactionController.addTransaction);
router
  .route('/:id')
  .get(authController.protect, transactionController.sendUserTransaction)
  .patch(authController.protect, transactionController.updateTransaction)
  .delete(authController.protect, transactionController.deleteTxn);

module.exports = router;
