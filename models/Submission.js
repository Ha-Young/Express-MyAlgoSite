const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  problem_id: { type: String, required: true },
  code: { type: String, required: true },
  result: { type: Boolean, required: true }
});

module.exports = mongoose.model('Submission', SubmissionSchema);
