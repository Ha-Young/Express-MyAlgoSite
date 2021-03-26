const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  sub: { type: String, unique: true, required: true },
  name: String,
  given_name: String,
  family_name: String,
  picture: String,
  email: { type: String, lowercase: true, unique: true, required: true },
  email_verified: Boolean,
  locale: String,
  failed_problem: Array,
  solved_problem: Array,
  accepted_submission: Number,
  total_submission: Number,
  submission_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }]
});

module.exports = mongoose.model('User', UserSchema);
