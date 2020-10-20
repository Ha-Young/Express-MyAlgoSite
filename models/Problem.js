const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: mongoose.Type.ObjectId,
  title: {
    type: String,
    required: true,
  },
  completed_users: {
    type: Number,
  },
  difficulty_level: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tests: [
    {
      code: {
        type: String,
        required: true,
      },
      solution: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Problem', ProblemSchema);
