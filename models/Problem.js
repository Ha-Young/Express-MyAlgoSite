const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: String,
  completed_users: Number,
  difficulty_level: Number,
  description: String,
  form: {
    functionName: String,
    arguments: mongoose.Schema.Types.Mixed
  },
  tests: [
    {
      code: String,
      solution: mongoose.Schema.Types.Mixed
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
