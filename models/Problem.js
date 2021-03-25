const mongoose = require("mongoose");

const TestCase = new mongoose.Schema({
  testCase: mongoose.Schema.Types.Mixed,
  answer: mongoose.Schema.Types.Mixed,
});

const ProblemSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty_level: Number,
  tags: [String],
  params: String,
  testCases: [TestCase],
  like: [mongoose.Schema.Types.Mixed],
  winner: mongoose.Schema.Types.Array,
});

module.exports = mongoose.model("Problem", ProblemSchema);
