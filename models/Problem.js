const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */

const TestSchema = new mongoose.Schema({
  code: { type: String, require: true, },
  solution: { type: mongoose.Schema.Types.Mixed , require: true, },
});

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  completed_users: {
    type: Number,
    require: true,
  },
  difficulty_level: {
    type: Number,
    require: true,
  },
  description: {
    type:String,
    require: true,
  },
  tests: [TestSchema]
});

module.exports = mongoose.model('Problem', ProblemSchema);
