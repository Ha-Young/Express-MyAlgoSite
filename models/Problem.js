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
    type: String,
    required: true
  }
});

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  completed_users: String,
  difficulty_level: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tests: [testSchema]
});

module.exports = mongoose.model('Problem', ProblemSchema);
