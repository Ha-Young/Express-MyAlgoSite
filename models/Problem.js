const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const TestSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  githubid: {
    type: String,
    required: true
  }
});

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
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
  defaultValue: {
    type: String,
    required: true
  },
  tests: [TestSchema]
});

module.exports = mongoose.model('Problem', ProblemSchema);
