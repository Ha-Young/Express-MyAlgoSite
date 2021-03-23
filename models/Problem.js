const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  "id": Number,
  "title": {
    type: String,
    unique: true,
  },
  "completed_users": Number,
  "difficulty_level": Number,
  "description": String,
  "tests": [{ "code": String, "solution": Number }]
});

module.exports = mongoose.model('Problem', ProblemSchema);
