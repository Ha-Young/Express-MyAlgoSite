const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'Problem should have id']
  },
  title: {
    type: String,
    required: [true, 'Problem should have title']
  },
  completed_users: {
    type: Number,
    default: 0
  },
  difficulty_level: {
    type: Number,
    required: [true, 'Problem should have difficulty level']
  },
  description: {
    type: String,
    required: [true, 'Problem should have description']
  },
  tests: [
    {
      code: String,
      solution: {}
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
