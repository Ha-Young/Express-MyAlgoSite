const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completed_users: {
    type: Number,
    default: 0 
  },
  difficulty_level: Number,
  description: String,
  tests: [
    {
      code: String,
      solution: {}
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
