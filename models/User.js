const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  displayName: { type: String, required: true },
  profileUrl: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  score: { type: Number, required: true, default: 0, min: 0 }
});

module.exports = mongoose.model('User', UserSchema);
