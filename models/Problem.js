const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const Mixed = mongoose.Schema.Types.Mixed;
const ProblemSchema = new mongoose.Schema({
  title: String,
  completed_users: Array,
  difficulty_level: Number,
  writer: String,
  description: String,
  tests: [
    {
      code: [Mixed],
      solution: Mixed
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
