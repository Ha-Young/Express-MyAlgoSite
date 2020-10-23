const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatarUrl: String,
  profileUrl: String,
  githubID: {
    type: String,
    required: true,
    unique: true,
  },
  totalScore: Number,
  triedProblems: Array,
},{
  timestamps: { currentTime: () => Math.floor(Date.now() / 1000) }
});

module.exports = mongoose.model('User', userSchema);
