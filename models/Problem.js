const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;
const Mixed = mongoose.SchemaTypes.Mixed;

const ProblemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed_users: { type: Number, required: true },
  difficulty_level: { type: Number, required: true },
  description: { type: String, required: true },
  tests: [
    {
      code: { type: String, required: true },
      solution: { type: Mixed, required: true }
    }
  ],
  completed_user_ids: [{ type: ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
