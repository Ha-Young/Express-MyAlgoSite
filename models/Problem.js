const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  completed_users: { type: Number, required: true },
  difficulty_level: { type: Number, required: true },
  description: { type: String, required: true },
  tests: [
    {
      code:  { type: String, required: true },
      answer: { type: mongoose.Schema.Types.Mixed, required: true }
    }
  ]
});

module.exports = mongoose.model('Problem', ProblemSchema);
