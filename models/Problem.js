const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const TestSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  solution: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, { _id: false });

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty_level: {
    type: Number,
    required: true,
  },
  completed_users: {
    type: Number,
    required: true,
  },
  completed_user_list: [{ type: String, unique: true }],
  description: {
    type: String,
    required: true,
  },
  tests: [TestSchema],
});

module.exports = mongoose.model("Problem", ProblemSchema);
