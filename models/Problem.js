const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  completed_users: { type: Number },
  difficulty_level: { type: Number },
  description: { type: String },
  tests: { type: Array },
});

module.exports = mongoose.model("Problem", ProblemSchema);
