const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  // 문제 이름, 정답자 수, 문제 레벨
});

module.exports = mongoose.model('Problem', ProblemSchema);
