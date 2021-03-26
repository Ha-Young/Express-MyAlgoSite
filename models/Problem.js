const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed_list: {
    type: Array,
    default: [],
  },
  difficulty_level: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tests: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Problem", ProblemSchema);
