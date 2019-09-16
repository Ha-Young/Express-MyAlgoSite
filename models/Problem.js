const mongoose = require('mongoose');

/*

  TODO: Fill in the model specification

 */
const TestSchema = new mongoose.Schema({
  code: String,
  solution: Schema.Types.Mixed
});

const ProblemSchema = new mongoose.Schema({
  id: Number,
  title: String,
  completed_users: Number,
  difficulty_level: Number,
  description: String,
  tests: [TestSchema]
});
/**
 * "id": 1,
    "title": "피보나치 수열",
    "completed_users": 15,
    "difficulty_level": 1,
    "description": "피보나치 수는 F(0) = 0, F(1) = 1일 때, 1 이상의 n에 대하여 F(n) = F(n-1) + F(n-2) 가 적용되는 수 입니다.",
    "tests": [
      {
        "code": "solution(3)",
        "solution": 2
      },
      {
        "code": "solution(2)",
        "solution": 1
      },
      {
        "code": "solution(1)",
        "solution": 1
      }
    ]
 */

module.exports = mongoose.model('Problem', ProblemSchema);
