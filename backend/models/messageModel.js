const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  message: {
    type: String,
    required: true,
    minlength: 1,
  },
});

module.exports = mongoose.model('Message', messageSchema);
