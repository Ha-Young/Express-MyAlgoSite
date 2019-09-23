const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  difficulty_level: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  completed_users: {
    type: Number
  },
  limit: [],
  tests: [
    {
      param: {
        type: String
      },
      solution: {
        type: mongoose.Schema.Types.Mixed,
        require: true
      }
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
