const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    index: true
  },
  title: String,
  completed_users: [String],
  difficulty_level: Number,
  description: String,
  tests: [{
    code: String,
    solution: mongoose.SchemaTypes.Mixed
  }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
