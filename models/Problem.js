const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    trim: true,
  },
  solution: {
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
  tests: [ TestSchema ],
}, { timestamps: true });

module.exports = mongoose.model('Problem', ProblemSchema);
