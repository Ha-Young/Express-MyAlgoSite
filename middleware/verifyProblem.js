const StringFunction = require("string-function-exec");
const Problem = require("../models/Problem");

async function verifyProblem(req, res, next) {
  try {
    const givenFunction = new StringFunction(req.body.code);
    const problem = await Problem.findById(req.params.problem_id);
    const tests = problem.tests;

    for (let i = 0; i < tests.length; i++) {
      const args = tests[i].args;
      const answer = givenFunction.execute(...args);
      const expected = tests[i].solution;

      if (answer !== expected) {
        return res.render("fail", {
          code: req.body.code,
          expected,
          answer,
        });
      }
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = verifyProblem;
