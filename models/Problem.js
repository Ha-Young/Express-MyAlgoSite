const mongoose = require("mongoose");

const TestSchema = new mongoose.Schema({
  code: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  solution: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  }
});

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  completed_users: {
    type: [ mongoose.Schema.Types.ObjectId ],
    ref: "User",
    required: true,
    default: []
  },
  difficulty_level: {
    type: Number,
    enum: [1, 2, 3],
    required: true,
    default: 1
  },
  description: {
    type: String,
    required: true
  },
  tests: [ TestSchema ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
