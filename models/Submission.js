const mongoose = require('mongoose');

const SubmissionSchema = new mongoose.Schema({
  user_id: String,
  history: Object
});

module.exports = mongoose.model('Submission', SubmissionSchema);
