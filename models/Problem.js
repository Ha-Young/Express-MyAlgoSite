const mongoose = require('mongoose');
const User = require("./User");

/*

  TODO: Fill in the model specification

 */
const testSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  solution: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed_users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  difficulty_level: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tests: [testSchema]
});

module.exports = mongoose.model("Problem", ProblemSchema);
