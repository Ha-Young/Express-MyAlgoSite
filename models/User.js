const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  id: String,
  displayName: String,
  username: String,
  prifileUrl: String,
  emails: String,
  avatar_url: String
});

module.exports = mongoose.model('User', userSchema);
