const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  name: String,
  googleId: String,
  profilePictureUrl: String,
});

module.exports = mongoose.model('User', userSchema);
