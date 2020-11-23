const express = require('express');
const cycleController = require('../controllers/cycleController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/:id')
  .get(cycleController.getCycle)
  .patch(cycleController.uploadImage, cycleController.updateCycle)
  .delete(cycleController.deleteCycle);
router
  .route('/')
  .get(cycleController.getAllCycles)
  .post(cycleController.uploadImage, cycleController.addCycle);

module.exports = router;
