const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  username: String,
  githubId: String,
  photo: String
});

module.exports = mongoose.model('User', userSchema);
