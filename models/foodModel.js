const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Food name cannot be empty'],
  },
  calories: {
    type: Number,
    required: [true, 'Calories is a required field'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A food must be associated with a user'],
  },
  consumedAt: {
    type: Date,
    default: Date.now(),
  },
});

foodSchema.index({ createdBy: 1, consumedAt: -1 });

const Food = mongoose.model('Food', foodSchema);
module.exports = Food;
