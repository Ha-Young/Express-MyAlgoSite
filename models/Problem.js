const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: mongoose.isValidObjectId,
  title: {
    type: String,
    required: true,
  },
  completed_users: {
    type: Number,
    default: 0,
    min: 0,
  },
  difficulty_level: {
    type: Number,
    default: 1,
    min: 1,
  },
  description: {
    type: String,
    required: true,
  },
  tests: [{
    type: Object,
    required: true,
    code: {
      type: String,
      required: true,
    },
    solution: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  }],
});

module.exports = mongoose.model('Problem', ProblemSchema);
