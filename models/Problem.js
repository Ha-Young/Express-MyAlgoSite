const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  completed_users: Number,
  difficulty_level: { type: Number, required: true },
  discription: String,
  notes: Array,
  tests: [
    {
      exampleCode: String,
      solution: mongoose.SchemaTypes.Mixed
    }
  ],
  attemptedCode: { type: mongoose.SchemaTypes.Mixed },
  attemptedAt: Date
});

module.exports = mongoose.model('Problem', ProblemSchema);
