const mongoose = require('mongoose');

const userSolutionSchema = new mongoose.Schema({
  problemId: {
    type: Number
  },
  username: {
    type: String
  },
  codeWritten: {
    type: String
  }
});

module.exports = mongoose.model('UserSolution', userSolutionSchema);
