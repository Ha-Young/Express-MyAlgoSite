const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true
  },
  github_id: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
