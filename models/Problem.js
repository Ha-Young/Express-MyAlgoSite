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
  title: {
    type: String,
    required: true,
  },
  completed_users: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
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
