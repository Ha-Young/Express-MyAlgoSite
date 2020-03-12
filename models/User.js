const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  id: String,
  displayName: String,
  username: String,
  profileUrl: String,
  avatar_url: String
});

module.exports = mongoose.model('User', userSchema);
