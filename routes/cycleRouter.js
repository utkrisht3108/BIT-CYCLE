const express = require('express');
const cycleController = require('../controllers/cycleController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/:id')
  .get(authController.protect, cycleController.getCycle)
  .patch(cycleController.uploadImage, cycleController.updateCycle)
  .delete(cycleController.deleteCycle);
router
  .route('/')
  .get(authController.protect, cycleController.getAllCycles)
  .post(cycleController.uploadImage, cycleController.addCycle);

module.exports = router;
