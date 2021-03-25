const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
  Types: { ObjectId, Mixed },
} = Schema;

const TestSchema = new Schema({
  code: {
    type: String,
  },
  output: {
    type: String,
  },
  solution: {
    type: Mixed,
  },
});

const ProblemSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  difficulty: {
    type: Number,
    default: 1,
  },
  completedCount: {
    type: Number,
    default: 0,
  },
  completedUsers: {
    type: [ObjectId],
    ref: "User",
  },
  argument: {
    type: String,
    default: "",
  },
  tests: [TestSchema],
});

const Problem = mongoose.model("Problem", ProblemSchema);

module.exports = { Problem };
