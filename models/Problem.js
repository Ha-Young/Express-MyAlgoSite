const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  completed_count: { type: Number, default: 0 },
  failure_count: { type: Number, default: 0 },
  difficulty_level: { type: Number, default: 1 },
  description: { type: String, required: true },
  parameters: [String],
  tests: [{
    code: String,
    solution: mongoose.Schema.Types.Mixed
  }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
