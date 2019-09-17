const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  githubId: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
