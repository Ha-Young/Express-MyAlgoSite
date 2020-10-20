const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  difficulty_level: Number,
  completed_users: Number,
  solution_count: Number,
  description: String,
  tests: {
    type: [{
        code: String,
        solution: String
      }]
  }
});

module.exports = mongoose.model('Problem', ProblemSchema);
