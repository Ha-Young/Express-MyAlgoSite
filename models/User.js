const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  profileUrl: String
});

module.exports = mongoose.model('User', userSchema);
