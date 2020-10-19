const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: {
    type: String,
    required: true,
  },
  completed_users: {
    type: Number,
    default: 0,
  },
  difficulty_level: {
    type: Number,
    default: 1,
  },
  description: String,
  tests: [{ code: String, solution: String }],
});

module.exports = mongoose.model('Problem', ProblemSchema);
