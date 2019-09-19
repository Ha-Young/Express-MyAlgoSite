const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  userName: String,
  googleId: String,
  thumbnail: String
});

module.exports = mongoose.model('User', UserSchema);
