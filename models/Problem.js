const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  completed_users: {
    type: Number,
    required: true
  },
  difficulty_level: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tests: [
    {
      code: {
        type: Schema.Types.Mixed
      },
      solution: {
        type: Schema.Types.Mixed,
        required: true
      }
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
