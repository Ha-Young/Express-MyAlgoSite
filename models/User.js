const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  githubId: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }
  // username: {
  //   type: String,
  //   unique: true,
  //   required: true,
  //   trim: true
  // }
});

module.exports = mongoose.model('User', userSchema);
