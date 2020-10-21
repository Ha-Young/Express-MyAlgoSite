const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: [true, 'A problem must have a title field'],
    unique: true,
  },
  completed_users: {
    type: Number,
    required: [true, 'A problem must have a completed_users field'],
    min: [0, 'The number of completed users can not be lower than 0'],
  },
  difficulty_level: {
    type: Number,
    required: [true, 'A problem must have a difficulty_level field'],
    min: [1, 'The level 1 is the lowest level'],
  },
  description: {
    type: String,
  },
  solution_count: Number,
  test: [
    {
      code: String,
    },
  ],
});

module.exports = mongoose.model('Problem', ProblemSchema);
