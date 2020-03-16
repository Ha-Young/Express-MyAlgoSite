const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const UserSchema = new mongoose.Schema({
  githubId: {
    type: String,
    unique: true
  },
  displayName: String,
  username: String,
  profileUrl: String,
  avatar_url: String
});

module.exports = mongoose.model('User', UserSchema);
