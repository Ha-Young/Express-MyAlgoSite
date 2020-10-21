const mongoose = require('mongoose');
/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed_users: {
    type: Number,
    default: 0,
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
  tests: [{ code: String, solution: mongoose.Schema.Types.Mixed }],
});

module.exports = mongoose.model('Problem', ProblemSchema);
