const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  github_id: {
    type: Number,
    required: [true, 'An id should be consist of numbers'],
  },
  github_token: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model('User', userSchema);
