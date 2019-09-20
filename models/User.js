const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  user_id: Number,
  username: String,
  login_with: String
});

module.exports = mongoose.model('User', userSchema);
