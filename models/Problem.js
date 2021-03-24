const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completedUsers: Number,
  dificultyLevel: Number,
  description: String,
  tests: [{
    code: mongoose.Schema.Types.Mixed,
    solution: mongoose.Schema.Types.Mixed,
  }],
});

module.exports = mongoose.model('Problem', ProblemSchema);
