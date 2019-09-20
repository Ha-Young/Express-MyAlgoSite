const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: Number,
  title : String,
  completed_users: Number,
  difficulty_level: Number,
  description: String,
  tests: Array
});

module.exports = mongoose.model('problem', ProblemSchema);
