const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true,
    required: true,
  },
  title: {
    type: String,
    unique: true,
    index: true,
    required: true
  },
  defaultFn: {
    type: String,
    required: true
  },
  completed_users: {
    type: Number,
    required: true
  },
  difficulty_level: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4]
  },
  description: {
    type: String,
    required: true
  },
  tests: [
    {
      code: {
        type: String,
        required: true
      },
      solution: {
        type: mongoose.Schema.Types.Mixed,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
