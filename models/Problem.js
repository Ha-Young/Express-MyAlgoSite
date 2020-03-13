const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
//FIXME: 전체적으로 타입 추가, tests 타입 수정
const ProblemSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  defaultFn: { type: String },
  completed_users: { type: Number },
  difficulty_level: { type: Number },
  description: { type: String },
  tests: []
});

module.exports = mongoose.model('Problem', ProblemSchema);
