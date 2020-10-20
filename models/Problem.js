const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  title: String,
});

module.exports = mongoose.model('Problem', ProblemSchema);
