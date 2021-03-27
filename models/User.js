const mongoose = require("mongoose");
const solvedProblemSchema = require("./subSchema/SolvedProblem");
const findOrCreate = require("mongoose-findorcreate");

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

userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);
