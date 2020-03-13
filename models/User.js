const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: String,
  name: String,
  avatarUrl: String,
});

module.exports = mongoose.model('User', userSchema);
