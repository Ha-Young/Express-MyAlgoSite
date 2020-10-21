const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */

 // completedQuestion 맞추면 하나씩 오르게
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  username: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedQuestion: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', userSchema);
