const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  googleId: String,
  photo: String,
  displayName: String,
  name: { familyName: String, givenName: String},
  provider: String,
});

module.exports = mongoose.model('User', userSchema);
