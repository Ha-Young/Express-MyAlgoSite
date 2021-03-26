const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const TestSchema = new mongoose.Schema({
  code: String,
  solution: mongoose.Schema.Types.Mixed,
});

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed_users: {
    type: Number,
    required: true,
    default: 0,
  },
  difficulty_level: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tests: [TestSchema],
});

module.exports = mongoose.model('Problem', ProblemSchema);
