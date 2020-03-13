const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  title: {type: String, required: true},
  completed_users: [{ type: String }],
  difficulty_level: { type: Number, required: true },
  description: { type: String, required: true },
  tests: [{ type: Object, required: true }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
