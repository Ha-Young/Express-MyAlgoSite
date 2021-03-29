const { string } = require("joi");
const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    max: 1024,
  },
  completed_users: {
    type: Number,
  },
  difficulty_level: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    max: 1024,
  },
  tests: {
    type: [
      {
        code: String,
        solution: String,
      },
    ],
  },
});

module.exports = mongoose.model("Problem", ProblemSchema);
