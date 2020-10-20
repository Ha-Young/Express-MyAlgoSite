const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed_users: { type: Number, required: true },
  difficulty_level: { type: Number, required: true },
  description: { type: String, required: true },
  tests: [Object],
  compledted_user_ids: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
