const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'A problem must have an id'],
    unique: true
  },
  title: {
    type: String,
    default: 'problem title'
  },
  completed_users: {
    type: Number,
    default: 0
  },
  difficulty_level: Number,
  description: String,
  tests: [{
    code: String,
    solution: mongoose.Schema.Types.Mixed
  }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
