const mongoose = require("mongoose");

const solvedProblemSchema = new mongoose.Schema({
  solvedProblemObjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  userCode: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = solvedProblemSchema;
