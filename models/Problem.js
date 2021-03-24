const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
  },
  title: String,
  completedUsers: Number,
  difficultyLevel: Number,
  description: String,
  tests: [{
    code: String,
    solution: mongoose.Schema.Types.Mixed,
  }],
});

module.exports = mongoose.model('Problem', ProblemSchema);
