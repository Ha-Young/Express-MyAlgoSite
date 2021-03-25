const mongoose = require("mongoose");

const UserProblemsSchema = new mongoose.Schema({
  userId: {
    type: String,
    require: [true, "please provide user id."],
  },
});

module.exports = mongoose.Model("UserProblems", UserProblemsSchema);
