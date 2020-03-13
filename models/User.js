const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  profileUrl: { type: String, required: true },
  username: { type: String, unique: true }
});

module.exports = mongoose.model('User', userSchema);
