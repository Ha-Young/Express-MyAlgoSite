const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problem_id', async (req, res, next) => {
  try{
    const problemInfo = await Problem.findById(req.params.problem_id).lean();
    res.render('problem', { problemInfo });
  } catch(e) {
    next(e);
  }
})

router.post('/:problem_id', async (req, res, next) => {
  try{
    const submitCode = req.body.submitCode;
    const problemInfo = await Problem.findById(req.params.problem_id).lean();
    const testList = problemInfo.tests;
    let failureList = [];
    let isFailure = false;

    const testRun = (test) => {
      if(eval(test.code) !== test.solution) {
        if(!isFailure) isFailure = true;

        failureList.push({
          testCode: test.code,
          expected: test.solution,
          instead: eval(test.code)
        })
      }
    };

    eval(submitCode);
    testList.forEach(testRun);

    if(isFailure) {
      res.render('failure', { failureList });
    } else {
      res.render('success');
    }
  } catch(e) {
    if(e instanceof ReferenceError) {
      res.render('failure', { error: e });
    }
    next(e);
  }
})

module.exports = router;
