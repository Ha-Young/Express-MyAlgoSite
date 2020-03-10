const mongoose = require('mongoose');

const TestSchema = new mongoose.Schema({
  solution: String,
  code: String
});

module.exports = mongoose.model('Test', TestSchema);
