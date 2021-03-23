const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const TestSchema = new mongoose.Schema({
  code: String,
  solution: mongoose.Schema.Types.Mixed,
});

const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completed_users: Number,
  difficulty_level: Number,
  description: String,
  tests: [TestSchema],
});

module.exports = mongoose.model('Problem', ProblemSchema);
