const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  completed_users: {
    type: Number,
    default: 0,
    min: 0,
  },
  difficulty_level: {
    type: String,
    required: [true, "difficulty_level is required"],
    enum: ["1", "2", "3"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
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
}, { timestamps: { createdAt: "create_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("Problem", ProblemSchema);
