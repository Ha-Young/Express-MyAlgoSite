const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
    },
    solution: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  { _id: false }
);

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed_users: {
    type: Number,
    default: 0,
  },
  difficulty_level: {
    type: Number,
    default: 1,
  },
  description: {
    type: String,
    required: true,
  },
  tests: {
    type: [TestSchema],
    required: true,
  },
});

module.exports = mongoose.model('Problem', ProblemSchema);
