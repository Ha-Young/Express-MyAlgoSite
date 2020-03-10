const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
      uniqe: true,
    },
    title: {
      type: String,
      required: true
    },
    solution_count: Number,
    difficulty_level: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    tests: Array
});

module.exports = mongoose.model('Problem', ProblemSchema);
