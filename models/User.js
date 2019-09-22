const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*

  TODO: Fill in the model specification

 */
const userSchema = new Schema({
  username: String,
  googleId: { type: String, required: true },
  thumbnail: String,
});

module.exports = mongoose.model('User', userSchema);
