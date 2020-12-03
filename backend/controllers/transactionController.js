const { Transaction } = require('../models/transactionModel');
const catchAsync = require('../utils/catchAsync');

module.exports = {
  addTransaction: catchAsync(async (req, res, next) => {
    const newTransaction = await Transaction.create({
      owner: req.body.owner,
      renter: req.body.renter,
      cycle: req.body.cycle,
      bookingStart: req.body.from,
      bookingEnd: req.body.to,
    });
    res.status(201).json({ status: 'success', newTransaction });
  }),
  sendUserTransaction: catchAsync(async (req, res, next) => {
    const transactions = await Transaction.find({
      $or: [{ owner: req.params.id }, { renter: req.params.id }],
    }).sort('createdAt');
    res.status(200).json({ status: 'success', transactions });
  }),
};
