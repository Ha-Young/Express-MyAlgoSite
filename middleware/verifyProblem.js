const StringFunction = require("string-function-exec");
const Problem = require("../models/Problem");
const { MongoError } = require("../service/error");

async function verifyProblem(req, res, next) {
  const problemId = req.params.problem_id;
  let givenFunction;
  let problem;

  try {
    givenFunction = new StringFunction(req.body.code);
  } catch (err) {
    res.redirect(`/problems/${problemId}/?errMessage=Syntax error: ${err.message}`);
  }

  try {
    problem = await Problem.findById(problemId);
  } catch (err) {
    next(new MongoError(err.message));
  }

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
        problemId,
      });
    }
  }

  next();
}

module.exports = verifyProblem;
