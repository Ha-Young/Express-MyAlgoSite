const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  completedUsers: {
    type: Number,
    required: true
  },
  difficultyLevel: {
    type: Number,
    required: true
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
        type: Schema.Types.Mixed,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
