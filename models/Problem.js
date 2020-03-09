const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const TestSchema = new mongoose.Schema({
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
  title: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  completed_users: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    required: true
  },
  tests: [TestSchema]
});

module.exports = mongoose.model('Problem', ProblemSchema);
