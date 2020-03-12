const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: String,
  name: String,
  avatarUrl: String,
  solvedProblems: [
    {
      id: String,
      solution: String
    }
  ],
  incompleteProblems: [
    {
      id: String,
      solution: String
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
