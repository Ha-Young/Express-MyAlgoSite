const mongoose = require("mongoose");

/*

  TODO: Fill in the model specification

 */
const { Schema } = mongoose;
const {
  Types: { ObjectId, Mixed },
} = Schema;

const TestSchema = new Schema({
  code: {
    type: String,
  },
  solution: {
    type: Mixed,
  },
});

const CompletedUserSchema = new Schema({
  count: {
    type: Number,
    default: 0,
  },
  users: {
    type: [ObjectId],
    default: [],
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
