const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
