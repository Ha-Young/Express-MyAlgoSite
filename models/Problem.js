const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  completed_users: Number,
  solution_count: Number,
  difficulty_level: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  tests: [
    {
      code: String,
      solution: {}
    }
  ]
});


module.exports = mongoose.model('Problem', ProblemSchema);
