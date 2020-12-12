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
    renterfeedback: { type: Boolean, default: false },
    ownerfeedback: { type: Boolean, default: false },
  },
  { timestamps: true }
);

transactionSchema.pre('save', async function (next) {
  let doc = this;
  doc = doc.toObject();
  delete doc._id;
  delete doc.createdAt;
  delete doc.updatedAt;
  if ((await this.constructor.findOne(doc))._id) {
    next(new Error('Transaction exists'));
  }
});
const Transaction = mongoose.model('Transaction', transactionSchema);

exports.Transaction = Transaction;
