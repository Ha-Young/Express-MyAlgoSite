const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completed_users: Number,
  difficulty_level: Number,
  description: String,
  tests: [
    {
      code: String,
      solution: String
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
