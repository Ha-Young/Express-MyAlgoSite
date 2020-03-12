const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const vm = require('vm');

router.get('/:problem_id', async (req, res, next) => {
  testId = req.params.problem_id;
  const test = await Problem.findOne({ id: testId });
  res.render('problem', { test: test });
});

router.post('/:problem_id', async (req, res, next) => {
  try {
    const code = req.body.code;
    const problemId = req.params.problem_id;
    const problem = await Problem.findOne({ id: problemId });
    const wrongResults = [];
    const correctResults = [];
    const script = new vm.Script(code);
    const userFuction = [{}];
    let isArray = false; 

    userFuction.forEach((userFuction) => {
      script.runInNewContext(userFuction);
    });

    const functionName = Object.keys(userFuction[0])[0];
    problem.tests.forEach((test) => {
    let userResult = '';
    if (test.isArgString) {
      console.log(userFuction[0][functionName](test.parameters))
      userResult = userFuction[0][functionName](test.parameters);
    } else {
      const parameter = vm.runInNewContext(test.parameters, {});
      if (parameter.length > 1) {
        userResult = userFuction[0][functionName](...parameter);
      } else {
        userResult = userFuction[0][functionName](parameter[0]);
      }
      // console.log(userResult);
    }

    if (test.solution.length > 1) {
      isArray = true;
      if (test.solution.join('') !== userResult.join('')) {
        wrongResults.push(userResult);
        correctResults.push(test.solution);
      }
    } else {
      if (test.solution[0] !== userResult) {
        wrongResults.push(userResult);
        correctResults.push(test.solution[0]);
      }
    }
  });

  if (!wrongResults.length) {
    // const problem = await Problem.findOneAndUpdate({ id: problemId }, { $inc: { completed_users : 1 }});
    // console.log(problem);
    res.render('success');
  } else {
    res.render('failure', { wrongResults, solution: correctResults, array: isArray, err: null });
  }

  } catch(error) {
    res.render('failure', { err: error });
  }
});


module.exports = router;

