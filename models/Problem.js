const mongoose = require("mongoose");

const { Mixed } = mongoose.SchemaTypes;

const ExampleSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  answer: {
    type: Mixed,
    required: true,
  },
  answer_type: {
    type: Mixed,
    required: true,
  }
});

const ProblemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  completed_users: {
    type: Number,
    required: true,
    default: 0,
  },
  difficulty_level: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  tests: [ ExampleSchema ],
  examples: [ ExampleSchema ],
}, { timestamps: true });

module.exports = mongoose.model("Problem", ProblemSchema);
