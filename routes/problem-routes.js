const router = require('express').Router();
const mongoose = require('mongoose');
const Problem = require('../models/Problem');

const vm = require('vm');

var _every = require('lodash.every');
var _filter = require('lodash.filter');
var ensureAuthenticated = require('../utils/ensure-auth')

router.get('/', ensureAuthenticated, (req, res, next) => {
  res.send('you are at a detailed problem page');
});

router.get('/:problem_id', ensureAuthenticated, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.problem_id)) {
    try {
      throw new Error ('Not Found');
    } catch (err) {
      err.status = 404
    }
    return next(err);
  }
  Problem.findById(req.params.problem_id)
    .then(data => {
      res.render('problem', { user: req.user, problem: data });
    })
    .catch(error => {
      error.status = 500;
      error.message = 'Internal Server Error';
      return res.status(500).render('error', {
        user: req.user,
        message: error.message,
        error: error,
      });
    });
});

router.post('/:problem_id', ensureAuthenticated, (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.problem_id)) {
    return next();
  }
  Problem.findById(req.params.problem_id)
    .then(data => {
      const tests = data.tests;
      const results = [];
      const sandbox = {};
      const fnName = data.fnName;
      for (let i = 0; i < tests.length; i++) {
        try {
          var result = vm.runInNewContext(
            `${req.body.code} ${fnName}(${tests[i].argument})`,
            sandbox,
            { timeout: 12000 }
          );
        } catch (err) {
          return res.status(302).render('failure', {
            user: req.user,
            problem: data,
            error: err,
          });
        }
        results.push({
          argument: tests[i].argument,
          solution: tests[i].solution,
          submitted: result,
          result: tests[i].solution === result,
        });
      }
      if (_every(results, { result: true })) {
        return res
          .status(302)
          .render('success', { user: req.user, problem: data });
      } else {
        return res.status(302).render('failure', {
          user: req.user,
          problem: data,
          failedTests: _filter(results, {
            result: false,
          }),
          passedTests: _filter(results, {
            result: true,
          }),
          error: undefined,
        });
      }
    })
    .catch(error => {
      error.status = 500;
      return res.status(500).render('error', {
        user: req.user,
        message: error.message,
        error: error,
      });
    });
});

module.exports = router;
