const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed_users: {
    type: Number,
    required: true,
  },
  difficulty_level: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tests: [{
    code: { type: String, required: true },
    solution: { type: mongoose.Mixed, required: true },
  }],
  made: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Problem', ProblemSchema);
