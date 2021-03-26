const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  user_id: String,
  problem_id: String,
  code: String,
  result: Boolean
});

module.exports = mongoose.model('Submission', SubmissionSchema);
