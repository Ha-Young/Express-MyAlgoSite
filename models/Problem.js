const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true
  },
  description: String,
  tests: {
    type: [{
        code: String,
        solution: String
      }]
  }
});

module.exports = mongoose.model('Problem', ProblemSchema);
