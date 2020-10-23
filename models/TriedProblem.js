const mongoose = require('mongoose');

const TriedProblemSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  problemId: {
    type: String,
    required: true,
  },
  result: {
    type: Array,
    required: true,
  },
  code: String,
});

module.exports = mongoose.model('TriedProblem', TriedProblemSchema);
