const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: { type: Number, unique: true, required: true, index: true },
  title: { type: String, required: true },
  solver: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  accepted: Number,
  submission: Number,
  difficulty_level: Number,
  description: String,
  tests: [{
    code: { type: String, required: true },
    solution: { type: mongoose.Schema.Types.Mixed, required: true }
  }]
});

ProblemSchema.methods.addSubmissionCount = function () {
  this.submission += 1;
  return this.save();
}

ProblemSchema.methods.addAcceptedCount = function () {
  this.accepted += 1;
  return this.save();
}

ProblemSchema.methods.addSolver = function (id) {
  if (!this.solver.includes(id)) {
    this.solver.push(id);
    return this.save();
  }
}

ProblemSchema.methods.getAcceptedRatio = function () {
  if (this.submission === 0) return 0;

  return ((this.accepted * 100) / this.submission).toFixed(2);
}

module.exports = mongoose.model('Problem', ProblemSchema);
