const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

const checkTestResults = (req, res, next) => {
  // 판단 로직을 더 줄일 방법은 없을까 고민해보기

  const results = [];
  const submittedSolution = req.body.solution;
  const tests = req.problem.tests;

  tests.forEach((test) => {
    const newFunc = submittedSolution + 'return ' + test.code;
    const result = new Function(newFunc)();

    if (result === test.solution) {
      results.push([true, result]);
    } else {
      results.push([false, result]);
    }
  });

  if (results.every((result) => result[0] === true)) {
    return res.render(
      'success',
      { username: req.user.username });
  }

  const failureIndex = results.findIndex((result) =>
    result[0] === false
  );

  return res.render(
    'failure',
    {
      currentProblemNumber: req.params.problem_id,
      failureProblem: tests[failureIndex],
      wrongAnswer: results[failureIndex][1]
    }
  );
};

module.exports = {
  ensureAuthenticated,
  checkTestResults,
};
