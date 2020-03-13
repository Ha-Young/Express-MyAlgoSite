const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  github_id: {
    type: String,
    unique: true,
    required: true,
  },
  solvedProblems: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);
