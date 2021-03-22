const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatalUrl: String,
  googleId: Number,
  solvedProblem: Object,
});

module.exports = mongoose.model('User', userSchema);
