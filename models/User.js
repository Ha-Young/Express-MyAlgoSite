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

UserSchema.methods.addTotalSubmissionCount = function () {
  this.total_submission += 1;
  return this.save();
}

UserSchema.methods.addAcceptedSubmissionCount = function () {
  this.accepted_submission += 1;
  return this.save();
}

UserSchema.methods.addSolvedProblem = function (id) {
  if (!this.solved_problem.includes(id)) {
    this.solved_problem.push(id);
  }

  if (this.failed_problem.includes(id)) {
    this.failed_problem = this.failed_problem.filter(problem => problem !== id);
  }

  return this.save();
}

UserSchema.methods.addFailedProblem = function (id) {
  if (!this.solved_problem.includes(id)) {
    this.failed_problem.push(id);
  }

  return this.save();
}

UserSchema.methods.addSubmissionHistory = function (id) {
  this.submission_history.push(id);

  return this.save();
}

UserSchema.methods.getTargetProblemSubmissions = function (id) {
  return this.submission_history.filter(submission => submission.problem_id === id);
}

module.exports = mongoose.model('User', UserSchema);
