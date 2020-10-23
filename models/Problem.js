const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  completed_users: {
    type: [ mongoose.Schema.Types.ObjectId ],
    default: [],
    required: true,
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
    code: String,
    solution: mongoose.Schema.Types.Mixed,
  }],
});

module.exports = mongoose.model('Problem', ProblemSchema);
