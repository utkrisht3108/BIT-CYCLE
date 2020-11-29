const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  participants: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = mongoose.model('Conversation', conversationSchema);
