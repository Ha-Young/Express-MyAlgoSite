const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testSchema = new Schema({
  code: { type: String, required: true },
  solution: { type: Schema.Types.Mixed, required: true },
});

const ProblemSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  completed_users: {
    type: [{ type: Schema.Types.ObjectId }],
    required: true,
    default: [],
  },
  difficulty_level: { type: String, required: true },
  description: { type: String, required: true },
  tests: { type: [testSchema], required: true },
});

module.exports = mongoose.model('Problem', ProblemSchema);
