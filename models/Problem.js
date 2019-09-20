const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new Schema({
  title: String,
  completed_users: Number,
  fnName: String,
  difficulty_level: Number,
  description: String,
  tests: [
    {
      argument: Schema.Types.Mixed,
      solution: Schema.Types.Mixed,
    },
  ],
});

module.exports = mongoose.model('Problem', ProblemSchema);
