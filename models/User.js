const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, trim: true },
  id: { type: String, unique: true, required: true, trim: true },
  password: { type: String, trim: true },
  provider: { type: String, required: true, default: 'codewars' },
});

module.exports = mongoose.model('User', UserSchema);
