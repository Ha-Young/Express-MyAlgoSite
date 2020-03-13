const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubid: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required:true,
  },
  completed_tests: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('User', userSchema);
