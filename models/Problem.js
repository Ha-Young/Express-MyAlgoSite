const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  title: { type: String },
  completed_users: { type: Number },
  difficulty_level: { type: Number },
  description: { type: String },
  tests: { type: Array },
});

module.exports = mongoose.model("Problem", ProblemSchema);
