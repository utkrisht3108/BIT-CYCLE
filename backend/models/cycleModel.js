const mongoose = require('mongoose');
const { User, userSchema } = require('./userModel');

const cycleSchema = new mongoose.Schema({
  model: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: false,
  },
  available: {
    type: Boolean,
  },
  comments: [
    {
      comment: {
        type: String,
      },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    },
  ],
});

cycleSchema.pre('save', async function (next) {
  const cycleId = this._id;
  const cycleOwner = await User.findById(this.owner);
  if (!cycleOwner) {
    next(new Error('No such user exists'));
  }
  if (!cycleOwner.cycles.includes(cycleId)) {
    await cycleOwner.update({ cycles: [...cycleOwner.cycles, cycleId] });
  }
  next();
});
cycleSchema.pre(/^find/, function (next) {
  this.populate('owner');
  this.populate('comments.user');
  next();
});
exports.Cycle = mongoose.model('Cycle', cycleSchema);
exports.cycleSchema = cycleSchema;
