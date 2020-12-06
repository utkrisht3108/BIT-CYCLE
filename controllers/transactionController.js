const { Transaction } = require('../models/transactionModel');
const { Cycle } = require('../models/cycleModel');
const { User } = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

module.exports = {
  addTransaction: catchAsync(async (req, res, next) => {
    const newTransaction = await Transaction.create(req.body);
    res.status(201).json({ status: 'success', newTransaction });
  }),
  sendUserTransaction: catchAsync(async (req, res, next) => {
    let transactions = await Transaction.find({
      $or: [{ owner: req.params.id }, { otherParty: req.params.id }],
    })
      .sort('-createdAt')
      .limit(10)
      .lean();
    for (const txn of transactions) {
      const ownerId = txn.owner;
      const otherPartyId = txn.otherParty;
      const cycleId = txn.cycle;
      txn.ownerName = (await User.findById(ownerId).select('name')).name;
      txn.otherPartyName = (
        await User.findById(otherPartyId).select('name')
      ).name;
      const cycleDetails = await Cycle.findOne(
        { _id: cycleId },
        { brand: 1, model: 1 }
      );
      if (cycleDetails) {
        txn.cycleDetails = {
          brand: cycleDetails.brand,
          model: cycleDetails.model,
        };
      }
    }
    if (!transactions) {
      throw new Error('Invalid Id');
    }
    res.status(200).json({ status: 'success', transactions });
  }),
  updateTransaction: catchAsync(async (req, res, next) => {
    const txnId = req.params.id;
    if (req.body.owner || req.body.otherParty || req.body.cycle) {
      throw new Error(
        'Cannot change owner otherParty or cycle of a transaction'
      );
    }
    const updatedTxn = await Transaction.findByIdAndUpdate(txnId, req.body, {
      new: true,
    });
    if (!updatedTxn) {
      throw new Error('Incorrect Id');
    }
    if (req.body.rating) {
      const cycleId = updatedTxn.cycle;
      const resp = await Transaction.aggregate([
        { $match: { cycle: cycleId, txnType: 'rent' } },
        { $group: { _id: cycleId, average: { $avg: '$rating' } } },
      ]);
      const updatedCycle = await Cycle.findByIdAndUpdate(
        cycleId,
        {
          ratingAvg: resp[0].average,
        },
        { new: true }
      );
      console.log(updatedCycle.ratingAvg);
      if (!updatedCycle) {
        throw new Error('Wrong cycle Id');
      }
    }
    res.status(200).json({
      status: 'success',
    });
    console.log(resp[0].average);
  }),
  deleteTxn: catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const deletedTxn = await Transaction.findByIdAndDelete(id);
    if (!deletedTxn) {
      throw new Error('Invalid Id');
    }
    res.status(200).json({ status: 'success', deletedTxn });
  }),
};
