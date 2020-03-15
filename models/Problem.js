const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed_users: {
    type: Number,
    default: 0
  },
  difficulty_level: {
    type: Number,
    default: 1
  },
  description: {
    type: String,
    required: true
  },
  params: {
    type: [ String ]
  },
  tests: [{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Test'
  }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
