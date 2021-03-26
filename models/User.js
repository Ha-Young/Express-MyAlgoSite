const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  googleId: String,
  solution: [{ problemId: Number, solutionFunction: String }],
});

module.exports = mongoose.model("User", userSchema);
