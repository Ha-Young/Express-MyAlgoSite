const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const ProblemSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'Problem should have id']
  },
  title: {
    type: String,
    required: [true, 'Problem should have title']
  },
  completed_users: {
    type: Number,
    default: 0
  },
  difficulty_level: {
    type: Number,
    required: [true, 'Problem should have difficulty level']
  },
  description: {
    type: String,
    required: [true, 'Problem should have description']
  },
  tests: [
    {
      code: String,
      solution: {}
    }
  ]
});


//이건 나중에 util 함수로 빼주거나 하다못해 selectString이라도 constant로 빼줘야되지않을까?
//유저가 알면 안되는 굳이 따지자면 보안 관련 정보 제어인듯 하다.
ProblemSchema.pre(/^find/, function (next) {
  this.select('-tests -__v -_id');
  next();
});

module.exports = mongoose.model('Problem', ProblemSchema);
