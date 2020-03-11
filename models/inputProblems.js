const Problem = require('./Problem');
const sample_problems = require('./sample_problems.json')

function inputProblems() {
  // db에 문제 json 파일 저장 안되어있으면 => 저장
  const problems = new Problem(sample_problems);

}

module.exports = inputProblems;
