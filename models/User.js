const mongoose = require('mongoose');

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
  completedQuestions: [Object],
});

module.exports = mongoose.model('User', userSchema);
