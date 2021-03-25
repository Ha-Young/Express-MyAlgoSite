const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  accepted: Number,
  submission: Number,
  difficulty_level: Number,
  description: String,
  tests: Array
});

module.exports = mongoose.model('Problem', ProblemSchema);
