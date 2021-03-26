const mongoose = require('mongoose');

const TestcaseSchema = new mongoose.Schema({ // 테케 아이디를 안가져도 되는가?
  code: {
    type: String,
    required: true,
  },
  solution: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, { timestamps: true });

const ProblemSchema = new mongoose.Schema({
  problemId: {
    type: Number,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    trime: true,
    required: true,
  },
  completedUsers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    enum: [1, 2, 3, 100],
    default: 1,
    required: true,
  },
  testcases: [TestcaseSchema],
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);
