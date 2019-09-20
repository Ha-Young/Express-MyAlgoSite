const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*

  TODO: Fill in the model specification

 */
const userSchema = new Schema({
  username: String,
  googleId: String,
  thumbnail: String,
});

module.exports = mongoose.model('User', userSchema);
