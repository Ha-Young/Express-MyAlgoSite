const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  githubid: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required:true
  },
  completed_tests: {
    type: Number,
    default: 0
  },

});

module.exports = mongoose.model('User', userSchema);
