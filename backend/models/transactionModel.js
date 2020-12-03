const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    renter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingStart: {
      type: Date,
      required: true,
    },
    bookingEnd: {
      type: Date,
      required: true,
    },
    cycle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cycle',
      required: true,
    },
    rating: { type: Number, default: 1 },
  },
  { timestamps: true }
);

exports.Transaction = mongoose.model('Transaction', transactionSchema);
