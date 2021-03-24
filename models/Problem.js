const mongoose = require("mongoose");

const TestCase = new mongoose.Schema({
  testcase: mongoose.Schema.Types.Mixed,
  answer: mongoose.Schema.Types.Mixed,
});

const Challenger = new mongoose.Schema({
  solved: Boolean,
});

const Accuracy = new mongoose.Schema({
  accuracy: Number,
  challengers_count: Number,
  challengers: [Challenger],
});

const ProblemSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficuty_level: Number,
  author: String,
  tags: [String],
  testcases: [TestCase],
  like: [mongoose.Schema.Types.Mixed],
  accuracy: {
    type: Accuracy,
  }
});

module.exports = mongoose.model("Problem", ProblemSchema);
