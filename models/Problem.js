const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const TestSchema = new mongoose.Schema({
  code: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  solution: {
    type: String,
    required: true
  },
});

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed_users: { type: Number },
  solution_count: { type: Number },
  difficulty_level: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tests: [ TestSchema ],
});

module.exports = mongoose.model('Problem', ProblemSchema);
