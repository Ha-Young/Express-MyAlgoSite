const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  userNickname: {
    type: String,
    unique: true,
    required: true
  },
  userId: {
    type: String,
    unique: true,
    required: true
  },
  userPassword: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('User', userSchema);
