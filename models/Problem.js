const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completed_users: Number,
  difficulty_level: Number,
  parameters: [String],
  description: String,
  tests: [{
    code: String,
    solution: String
  }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
