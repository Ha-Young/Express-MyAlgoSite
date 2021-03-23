const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
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
    type: Array,
  },
});

module.exports = mongoose.model("Problem", ProblemSchema);
