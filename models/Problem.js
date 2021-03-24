const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completed_users: Number,
  difficulty_level: Number,
  parameters: [String],
  description: String,
  tests: [{
    code: String,
    solution: mongoose.Schema.Types.Mixed
  }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
