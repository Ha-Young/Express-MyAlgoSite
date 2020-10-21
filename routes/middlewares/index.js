const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

const checkTestResults = (req, res, next) => {
  // try {
  //   const results = [];
  //   const submittedSolution = req.body.solution;
  //   const tests = req.problem.tests;
  //   const problemId = req.params.problem_id;
  //   const username = req.user.username;

  //   try {
  //     tests.forEach((test) => {
  //       const newFunc = submittedSolution + 'return ' + test.code;
  //       const result = new Function(newFunc)();

  //       if (result === test.solution) {
  //         results.push([true, result]);
  //       } else {
  //         results.push([false, result]);
  //       }
  //     });
  //   } catch (error) {
  //     return res.render('failure', {
  //       problemId,
  //       failureProblem: error.message,
  //       expectedAnswer: error.message,
  //       wrongAnswer: error.message,
  //       username,
  //     });
  //   }

  //   if (results.every(result => result[0] === true)) {
  //     return res.render(
  //       'success',
  //       { username }
  //     );
  //   }

  //   const failureIndex = results.findIndex(result => result[0] === false);
  //   return res.render(
  //     'failure',
  //     {
  //       problemId,
  //       failureProblem: tests[failureIndex].code,
  //       expectedAnswer: tests[failureIndex].solution,
  //       wrongAnswer: results[failureIndex][1],
  //       username,
  //     }
  //   );
    throw new Error('실패!');
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = {
  ensureAuthenticated,
  checkTestResults,
};
