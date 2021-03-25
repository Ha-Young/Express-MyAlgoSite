const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const testSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  solution: {
    any: mongoose.Schema.Types.Mixed
  }
});

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed_users: {
    type: Number,
    required: true
  },
  difficulty_level: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tests: [ testSchema ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
