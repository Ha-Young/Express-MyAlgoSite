const mongoose = require("mongoose");

const TestCase = new mongoose.Schema({
  testcase: mongoose.Schema.Types.Mixed,
  answer: mongoose.Schema.Types.Mixed,
});

const ProblemSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty_level: Number,
  author: String,
  tags: [String],
  testCases: [TestCase],
  like: [mongoose.Schema.Types.Mixed],
  winner: Number,
});

module.exports = mongoose.model("Problem", ProblemSchema);
