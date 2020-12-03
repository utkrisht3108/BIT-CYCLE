const { Transaction } = require('../models/transactionModel');
const { Cycle } = require('../models/cycleModel');
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
  updateRating: catchAsync(async (req, res, next) => {
    const txnId = req.params.id;
    const newRating = req.body.rating;
    const updatedTxn = await Transaction.findByIdAndUpdate(
      txnId,
      { rating: newRating },
      { new: true }
    );
    const cycleId = updatedTxn.cycle;
    const resp = await Transaction.aggregate([
      { $match: { cycle: cycleId } },
      { $group: { _id: cycleId, average: { $avg: '$rating' } } },
    ]);
    await Cycle.findByIdAndUpdate(cycleId, {
      ratingAvg: resp[0].average,
    });
    res.status(200).json({
      status: 'success',
    });
    console.log(resp[0].average);
  }),
};
