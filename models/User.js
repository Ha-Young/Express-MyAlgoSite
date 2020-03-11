const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: String,
  avartar: String
});

module.exports = mongoose.model('User', userSchema);
