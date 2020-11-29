const mongoose = require('mongoose');
const { User, userSchema } = require('./userModel');

const cycleSchema = new mongoose.Schema({
  color: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
  },
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
  images: [
    {
      type: String,
    },
  ],
  accessories: [{ type: String, lowercase: true, trim: true }],
});

cycleSchema.pre(/^find/, function (next) {
  this.populate('owner');
  this.populate('comments.user');
  next();
});
exports.Cycle = mongoose.model('Cycle', cycleSchema);
exports.cycleSchema = cycleSchema;
