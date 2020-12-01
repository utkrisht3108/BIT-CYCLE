const mongoose = require('mongoose');
const { ratingSchema } = require('./ratingModel');
const { commentSchema } = require('./commentSchema');

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
  comments: {
    type: [commentSchema],
  },
  ratings: {
    type: [ratingSchema],
    //select: false,
  },
  images: [
    {
      type: String,
    },
  ],
  accessories: [{ type: String, lowercase: true, trim: true }],

  ratingAvg: { type: Number, default: 0 },
});

cycleSchema.pre(/^find/, function (next) {
  this.populate('owner');
  this.populate('comments.user');
  next();
});
exports.Cycle = mongoose.model('Cycle', cycleSchema);
exports.cycleSchema = cycleSchema;
