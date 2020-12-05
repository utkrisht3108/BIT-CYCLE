const express = require('express');
const conversationController = require('../controllers/conversationController');

const router = express.Router();
router.route('/:id').get(conversationController.getConversations);
module.exports = router;
