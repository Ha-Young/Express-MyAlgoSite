const mongoose = require("mongoose");
const solvedProblemSchema = require("./subSchema/SolvedProblem");

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    required: true,
  },
  displayName: {
    type: String,
    trim: true,
    required: true,
  },
  solvedProblems: [solvedProblemSchema]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
