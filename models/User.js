const mongoose = require('mongoose');
/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 20,
  },
  email: {
    type: String,
    unique: true,
    minlength: 1,
  },
  password: {
    type: String,
    minlength: 6,
  },
  avatar: {
    type: String,
  }
});

module.exports = mongoose.model("User", userSchema);
