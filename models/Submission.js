const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  problem_id: { type: Number, required: true },
  code: { type: String, required: true },
  result: { type: String, required: true }
}, { timestamps: true });

SubmissionSchema.methods.getProblem = function (id) {
  this.submission += 1;
  return this.save();
}

module.exports = mongoose.model('Submission', SubmissionSchema);
