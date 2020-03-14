const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  completed_users: { type: Number, required: true, default: 0, min: 0 },
  difficulty_level: { type: Number, required: true, min: 1 },
  description: { type: String, required: true },
  func: { type: String, required: true },
  tests: [{
    code: { type: String, required: true },
    solution: { type: String, required: true }
  }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
