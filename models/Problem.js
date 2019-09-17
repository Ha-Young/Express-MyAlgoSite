const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const TestSchema = new mongoose.Schema({
  params: [mongoose.Schema.Types.Mixed],
  solution: mongoose.Schema.Types.Mixed
});

const ProblemSchema = new mongoose.Schema({
  title: String,
  completed_users: Number,
  difficulty_level: Number,
  description: String,
  tests: [TestSchema]
});

module.exports = mongoose.model('Problem', ProblemSchema);
