const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profileUrl: {
    type: String,
    unique: true
  },
  provider: String
});

module.exports = mongoose.model('User', userSchema);
