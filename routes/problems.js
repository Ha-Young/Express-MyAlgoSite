const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const User = require('../models/User');
const error = require('../lib/error');
const { checkUser } = require('../middlewares/checkUser');
const { _ } = require('lodash');
const { VM } = require('vm2');
const vm = new VM({
  timeout: 5000,
  sandbox: {}
});

router.get('/:id', checkUser, async (req, res, next) => {
  try {
    const id = req.params.id;
    const username = req.user.username;
    const problemData = await Problem.findById(id);

    res.render('problemDetail', { username, problemData });
  } catch (err) {
    if (err.name === 'CastError') return next(new error.CastError());
    
    next(new error.GeneralError());
  }
});

router.post('/:id', checkUser, async (req, res, next) => {
  const {
    body: { solution: userSolution },
    params: { id },
  } = req;
  const failureTests = [];
  const problem = await Problem.findById(id);
  const tests = problem.tests;
  const username = req.user.username;

  try {
    tests.forEach(test => {
      const code = `${userSolution} ${test.code}`;
      const result = vm.run(code);
      
      if (!_.isEqual(result, test.solution)) failureTests.push([test.code, test.solution, result]);
    });

    if (!failureTests.length) {
      const user = await User.findById(req.user._id);

      await Problem.findByIdAndUpdate(id, { '$addToSet': { 'completed_users': user._id } });

      return res.render('success', { username });
    }

    res.render('failure', {
      failureTests,
      username,
      problemTitle: problem.title,
      errorMessage: null
    });
  } catch (err) {
    if (
      err instanceof SyntaxError ||
      err instanceof TypeError ||
      err instanceof ReferenceError ||
      err.message === 'Script execution timed out.'
    ) {
      return res.render('failure', {
        username,
        problemTitle: problem.title,
        errorMessage: err.message,
        errorStack: err.stack
      });
    }
    if (err.name === 'CastError') return next(new error.CastError());

    next(new error.GeneralError());
  }
});

module.exports = router;
