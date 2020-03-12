const express = require('express');
const router = express.Router();
const verifyLogin = require('./middlewares/authorization').verifyLogin;
const Problem = require('../models/Problem');
const errors = require('../lib/errors');
const assert = require('assert').strict;
const { expect, AssertionError } = require('chai');
const { VM } = require('vm2');
const vm = new VM({
  timeout: 1000,
  sandbox: {
    expect
  }
});

router.get('/:problem_id', verifyLogin, async (req, res, next) => {
  let problem;
  try {
    problem = await Problem.findOne({ id: req.params.problem_id }).exec();
  } catch (err) {
    next(
      new errors.GeneralError('Error while finding a problem')
    );
  }

  res.render('problem', { problem });
});

router.post('/:problem_id', verifyLogin, async (req, res, next) => {
  const ERROR_TYPE = {
    FAILED: 'failed'
  }

  let problem;
  try {
    problem = await Problem.findOne({ id: req.params.problem_id }).exec();
  } catch (err) {
    next(
      new errors.GeneralError('Error while finding a problem')
    );
  }

  const tests = problem.tests;

  let codeToRun = req.body.code + '\n';
  
  for (let i = 0; i < tests.length; i++) {
    const testCode = tests[i].code;
    let solution = tests[i].solution;

    // console.log(testCode, typeof solution);

    try {
      eval(solution);
    } catch (err) {
      solution = "'" + solution + "'";
    }

    codeToRun += `\n
      expect(${testCode}, "${testCode}").to.eql(${solution});
      \n
    `

  // solution to number1
  // function solution(n) {
  //   if (n == 0) return 0;
  //   if (n == 1) return 1;
  //   return solution(n - 1) + solution(n - 2);            
  // }

  // solution to number5
  //   function filter_list(l) {
  //     const result = [];
  
  //     for (let i = 0; i < l.length; i++) {
  //         if(typeof l[i] === 'number') {
  //             result.push(l[i]);
  //         }
  //     }
  
  //     return result;
  // }

  }

  try {
    vm.run(codeToRun);
    const filter = { id: problem.id };
    const update = { $inc: { completed_users: 1 } }
    problem = await Problem.findOneAndUpdate(filter, update, {
      new: true 
    }).exec();
    res.status(200).render('success', { problem });
  } catch (err) {
    let detail;
    if (err instanceof AssertionError) {
      detail = err.message;
    } else {
      detail = err.message + '\n' + err.stack;
    }
      // detail = err.message + '\n' + err.stack;
    res.status(200).render('failure', { problem, detail });
  }
});

module.exports = router;
