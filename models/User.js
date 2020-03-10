const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: { type: Number, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatarUrl: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
