const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  solution: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  code: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Test', TestSchema);
