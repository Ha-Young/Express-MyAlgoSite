const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

exports.getProblem = async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findOne({ _id: problemId });

    console.log(problem)
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
    let isCorrect = false;
  
    const backTofunc = new Function(`return ${code}`);
    const str = `
      const solution = ${backTofunc()};
      return ${tests[0].code} === ${tests[0].solution}
    `
    const testCode = new Function(str);
    console.log(testCode());

    // if (backTofunc().name === 'solution') {
    //   foo();
    // }

    if (isCorrect) {
      res.render('success');
    } else {
      res.render('failure');
    }
  } catch (err) {
    next(err);
  }
};
