const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
    required: true,
  },
  profilePictureUrl: String,
});

module.exports = mongoose.model('User', userSchema);
