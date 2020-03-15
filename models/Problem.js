const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  completed_users: { type: Number, required: true },
  difficulty_level: { type: Number, required: true, enum: [1, 2, 3, 4] },
  description: { type: String, required: true },
  default_function: { type: String, required: true },
  tests: [{ code_params: mongoose.Schema.Types.Mixed, solution: mongoose.Schema.Types.Mixed }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
