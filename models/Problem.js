const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  problem_number: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty_level: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tests: [
    {
      code: {
        type: String,
        required: true,
      },
      solution: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
      }
    }
  ],
  completed_users: []
});

module.exports = mongoose.model('Problem', ProblemSchema);
