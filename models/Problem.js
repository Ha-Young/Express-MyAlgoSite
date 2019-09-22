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
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
}, { _id: false });

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed_users: [String],
  difficulty_level: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tests: {
    type: [TestSchema],
    required: true
  }
});

module.exports = mongoose.model('Problem', ProblemSchema);
