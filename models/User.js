const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  githubId: String,
  userId: String,
  userPassWord: String,
  score: {
    type: Number,
    default: 0,
  },
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
