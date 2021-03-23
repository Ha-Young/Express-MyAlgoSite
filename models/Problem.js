const mongoose = require('mongoose');

const TestCase = new mongoose.Schema({
  testcase: mongoose.Mixed,
  answer: mongoose.Mixed,
});

const Challenger = new mongoose.Schema({
  _id: mongoose.ObjectId,
  solved: Boolean,
});

const Accuracy = new mongoose.Schema({
  accuracy: Number,
  challengers_count: Number,
  challengers: [Challenger],
});

const ProblemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.ObjectId,
    index: true,
  },
  title: String,
  description: String,
  difficuty_level: Number,
  author: String,
  tags: [String],
  testcases: [TestCase],
  like: [mongoose.ObjectId],
  accuracy: {
    type: Accuracy,
  }
});

module.exports = mongoose.model('Problem', ProblemSchema);
