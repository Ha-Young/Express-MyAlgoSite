const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  title: String,
  completed_users: Number,
  difficulty_level: Number,
  description: String,
  tests: [
    {
      code: mongoose.Schema.Types.Mixed,
      answer: mongoose.Schema.Types.Mixed
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
