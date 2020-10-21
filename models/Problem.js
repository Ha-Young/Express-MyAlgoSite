const mongoose = require('mongoose');
const Strategy = require('passport-github');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  title: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  completed_users: {
    type: Number,
    unique: true,
    required: true,
    trim: true
  },
  difficulty_level: {
    type: Number,
    unique: true,
    required: true,
    trim: true
  },
  description: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  tests: [
    {
      code: String,
      solution: {}
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
