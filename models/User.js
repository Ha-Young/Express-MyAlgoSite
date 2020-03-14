const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  profileUrl: { type: String, required: true },
  username: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('User', userSchema);
