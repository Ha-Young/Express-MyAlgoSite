const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const Mixed = mongoose.Schema.Types.Mixed;

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed_users: {
    type: Array,
    required: true
  },
  difficulty_level: {
    type: Number,
    required: true
  },
  writer: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tests: [
    {
      code: {
        type: Mixed,
        required: true
      },
      solution: {
        type: Mixed,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
