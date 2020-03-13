const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProblemSchema = new Schema({
  problemId: {
    type: Number,
    require: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  completedUsers: {
    type: Array,
    required: true,
    default: []
  },
  difficultyLevel: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  restrictions: {
    type: [String],
    required: true
  },
  examples: {
    type: [Object]
  },
  examplesDescription: {
    type: [String]
  },
  arguments: [String],
  reference: String,
  userInput: {
    type: String,
    default: ''
  },
  initialInput: String,
  tests: {
    type: [{
      code: {
        type: String,
        required: true
      },
      expected: {
        type: Schema.Types.Mixed,
        require: true
      }
    }]
  }
});

module.exports = mongoose.model('Problem', ProblemSchema);
