const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completedUsers: {
    type: Number,
    default: 0
  },
  form: String,
  difficultyLevel: Number,
  description: String,
  tests: [
    {
      code: String,
      solution: mongoose.Schema.Types.Mixed,
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
