const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  googleId: Number,
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  photo_url: {
    type: String,
    required: true
  },
  solved_count: {
    type: Number,
    required: true
  },
});

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
