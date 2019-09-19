const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  problemId: Number,
  title: String,
  completed_users: String,
  difficulty_level: String,
  description: String,
  tests: [{ code: String, solution: mongoose.Schema.Types.Mixed }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
