const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  level: {
    type: Number,
    required: true
  },
  completed_users: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    required: true
  },
  defaultValue: {
    type: String,
    required: true
  },
  tests: [{
    parameters: {
      type: Array
    },
    solution: {
      type: Array,
      required: true
    },
    solved: {
      type: Boolean
    }
  }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
