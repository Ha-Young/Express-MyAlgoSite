const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true },
  title: { type: String, required: true },
  solver: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  accepted: Number,
  submission: Number,
  difficulty_level: Number,
  description: String,
  tests: [{
    code: { type: String, required: true },
    solution: { type: String, required: true }
  }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
