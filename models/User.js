const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  user_id: Number,
  user_name: String,
  signup_date: Date
});

module.exports = mongoose.model('User', userSchema);
