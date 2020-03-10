const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  title: String,
  completed_users: Number,
  difficulty_level: Number,
  description: String,
  tests: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Test",
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
