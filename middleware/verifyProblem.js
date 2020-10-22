const Problem = require("../models/Problem");
const { MongoError } = require("../service/error");

const vm = require("vm");

async function verifyProblem(req, res, next) {
  const problemId = req.params.problem_id;

  let tests;
  try {
    const problem = await Problem.findById(problemId);
    tests = problem.tests;
  } catch (err) {
    next(new MongoError());
  }

  try {
    for (let i = 0; i < tests.length; i++) {
      const code = tests[i].code;
      const answer = tests[i].answer;
      const context = { result: null };
      const script = new vm.Script(`${req.body.code}result = ${code};`);

      vm.createContext(context);
      script.runInContext(context);

      if (answer !== context.result) {
        return res.redirect(`/problems/${problemId}/?errMessage="${code}" is expected ${answer}. your answer is ${context.result}`);
      }
    }

    next();
  } catch (err) {
    res.redirect(`/problems/${problemId}/?errMessage=Syntax error: ${err.message}`);
  }
}

module.exports = verifyProblem;
