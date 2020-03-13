const express = require('express');
const router = express.Router();
const verifyLogin = require('./middlewares/authorization').verifyLogin;
const Problem = require('../models/Problem');
const errors = require('../lib/errors');
const { expect, AssertionError } = require('chai');
const { VM } = require('vm2');
const vm = new VM({
  timeout: 12000,
  sandbox: {
    expect
  }
});

router.get('/:problem_id', verifyLogin, async (req, res, next) => {
  let problem;
  try {
    problem = await Problem.findOne({ _id: req.params.problem_id }).exec();
  } catch (err) {
    return next(
      new errors.GeneralError('Error while fetching a problem from DB\n' + err)
    );
  }
  res.render('problem', { problem });
});

router.post('/:problem_id', verifyLogin, async (req, res, next) => {
  let problem;
  try {
    problem = await Problem.findOne({ _id: req.params.problem_id }).exec();
  } catch (err) {
    return next(
      new errors.GeneralError('Error while fetching a problem from DB\n' + err)
    );
  }

  const tests = problem.tests;
  let codeToRun = req.body.code;
  for (let i = 0; i < tests.length; i++) {
    const code = tests[i].code;
    let solution = tests[i].solution;
    try {
      eval(solution);
    } catch (err) {
      solution = '"' + solution + '"';
    }
    codeToRun += `\nexpect(${code}, "${code}").to.eql(${solution});\n`;
  }

  try {
    vm.run(codeToRun);
    const filter = { _id: problem._id };
    const update = { $inc: { completed_users: 1 } }
    problem = await Problem.findOneAndUpdate(filter, update, {
      new: true
    }).exec();
    res.status(200).render('success', { problem });
  } catch (err) {
    if (err.name === 'MongoError') {
      return next(
        new errors.GeneralError(
          'Error while finding and updating [completed_users] field of a problem\n' + err
        )
      );
    }

    let detail = err.message;
    if ( !(err instanceof AssertionError) ) {
      detail = err.message + '\n' + err.stack;
    }
    res.status(200).render('failure', { problem, detail });
  }
});

module.exports = router;
