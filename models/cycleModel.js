const mongoose = require('mongoose');
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
  images: [
    {
      type: String,
    },
  ],
  accessories: [{ type: String, lowercase: true, trim: true }],
  bookingStarts: { type: Date },
  bookingEnds: { type: Date },
  ratingAvg: { type: Number, default: 1 },
  boughtIn: { type: String, required: true },
  buyPrice: { type: Number },
  forbuy: { type: Boolean},
  forrent: { type: Boolean, default: true},
});

cycleSchema.pre(/^find/, function (next) {
  this.populate('owner');
  this.populate('comments.user');
  next();
});
exports.Cycle = mongoose.model('Cycle', cycleSchema);
exports.cycleSchema = cycleSchema;
