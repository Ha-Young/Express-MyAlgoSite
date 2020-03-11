const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  solution: mongoose.Schema.Types.Mixed,
  code: String
});

module.exports = mongoose.model('Test', TestSchema);
