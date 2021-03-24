const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "id is required"],
    index: true,
  },
  title: {
    type: String,
    required: [true, "title is required"]
  },
  completed_users: {
    type: Number,
    default: 0,
    min: 0,
  },
  difficulty_level: {
    type: Number,
    default: 1,
    min: 1,
  },
  description: {
    type: String,
    required: [true, "description is required"]
  },
  tests: [{
    type: Object,
    required: [true, "tests is required"],
    code: {
      type: String,
      required: [true, "test code is required"],
    },
    solution: {
      type: mongoose.Schema.Types.Mixed,
      required: [true, "test solution is required"],
    },
  }],
}, { timestamps: true });

module.exports = mongoose.model("Problem", ProblemSchema);
