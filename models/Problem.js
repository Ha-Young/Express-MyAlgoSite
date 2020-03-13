const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  completed_users: { type: Number },
  difficulty_level: { type: Number },
  description: { type: String },
  tests: { type: Object }
});

module.exports = mongoose.model('Problem', ProblemSchema);