const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  user_id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required:  true
  },
  login_with: String
});

module.exports = mongoose.model('User', userSchema);
