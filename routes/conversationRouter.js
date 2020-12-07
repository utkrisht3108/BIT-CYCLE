const express = require('express');
const conversationController = require('../controllers/conversationController');
const authController = require('../controllers/authController');

const router = express.Router();
router
  .route('/:id')
  .get(authController.protect, conversationController.getConversations);
module.exports = router;
