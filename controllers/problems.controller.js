const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

exports.getProblem = async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findOne({ _id: problemId });
    res.render('problem', { problem: problem });
  } catch (err) {
    next(err);
  }
}

exports.submitAnswer = async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const code = req.body.code;
    const { tests } = await Problem.findOne({ _id: problemId });
    const backTofunc = new Function(`return ${code}`);
 
    const result = tests
      .map(test => {
        let getResultTemplate;
        if (typeof test.solution === 'string') {
          getResultTemplate = `
          const solution = ${backTofunc()};
          return ${test.code} === '${test.solution}';
        `
        } else {
          getResultTemplate = `
          const solution = ${backTofunc()};
          return ${test.code} === ${test.solution};
        `
        }
        const getResult = new Function(getResultTemplate);
        return getResult();
      })
      .every(result => result);

    if (result) {
      res.render('success');
    } else {
      res.render('failure');
    }
  } catch (err) {
    next(err);
  }
};

/*수박수
const solution = n => {
	const repeatCount = Math.floor(n / 2);
  const answer = '수박'.repeat(repeatCount);
  if (n % 2) return answer + '수';
  return answer;
};*/


/*
function solution(n) {
    var fibonacci = [0,1];

    for(var i = 2; i <= n; i++){
        fibonacci.push((fibonacci[0] + fibonacci[1]) % 1234567);
        fibonacci.shift();
    }

    var answer = fibonacci[1];
    return answer;
} */


/*function solution(x){
  return !(x % (x + "").split("").reduce((a, b) => +b + +a ));
} */