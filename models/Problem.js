const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completed_users: Number,
  difficulty_level: Number,
  description: String,
  test: [{ code: String, solution: Number }],
});

module.exports = mongoose.model("Problem", ProblemSchema);
