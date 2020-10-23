const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
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
  },
  difficulty_level: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tests: [{
    code: {
      type: String,
    },
    solution: {
      type: {},
    },
  }],

});

module.exports = mongoose.model('Problem', ProblemSchema);
