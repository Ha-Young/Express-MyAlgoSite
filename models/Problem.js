const mongoose = require("mongoose");

const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, "A problem must have an id"],
    unique: true
  },
  title: {
    type: String,
    default: "problem title"
  },
  difficulty_level: Number,
  description: String,
  tests: [{
    code: String,
    solution: mongoose.Schema.Types.Mixed
  }],
  solved_users: {
    type: Array
  }
});

module.exports = mongoose.model("Problem", ProblemSchema);
