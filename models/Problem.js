const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  completed_users: Number,
  difficulty_level: { type: Number, required: true },
  discription: String,
  note: String,
  test: [
    {
      exampleCode: String,
      soiution: String
    }
  ],
  attemptedCode: { type: String, required: true },
  attemptedAt: Date
});

module.exports = mongoose.model('Problem', ProblemSchema);
