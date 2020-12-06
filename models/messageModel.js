const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
  {
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
    conversation: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
