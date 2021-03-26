const mongoose = require("mongoose");

const TestcaseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  solution: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
}, { timestamps: true });

module.exports = TestcaseSchema;
