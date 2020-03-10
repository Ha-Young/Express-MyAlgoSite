const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: Number,
  name: String,
  email: String,
  avatarUrl: String
});

module.exports = mongoose.model('User', userSchema);
