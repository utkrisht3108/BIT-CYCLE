const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
  rating: {
    type: Number,
    default: 0,
    required: true,
    max: 5,
    min: 1,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

exports.Rating = mongoose.model('Rating', ratingSchema);
exports.ratingSchema = ratingSchema;
