const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  user_id: String,
  submission_history: Object
});

module.exports = mongoose.model('Submission', SubmissionSchema);
