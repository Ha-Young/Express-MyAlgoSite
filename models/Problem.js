const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  title: { type: String, required: true },
  completed_users: { type: Number, required: true },
  difficulty_level: { type: Number, required: true },
  description: { type: String, required: true },
  default_function: { type: String, required: true },
  tests: { type: Array, required: true }
});

module.exports = mongoose.model('Problem', ProblemSchema);
