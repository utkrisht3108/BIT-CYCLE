const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    otherParty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingStart: {
      type: Date,
    },
    bookingEnd: {
      type: Date,
    },
    cycle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cycle',
      required: true,
    },
    rating: { type: Number, default: 1 },
    txnType: { type: String, required: true, enum: ['rent', 'buy'] },
  },
  { timestamps: true }
);

exports.Transaction = mongoose.model('Transaction', transactionSchema);
