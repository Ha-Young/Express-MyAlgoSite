const { VM } = require("vm2");
const Problem = require("../models/Problem");

async function getAll(req, res, next) {
  const problems = await Problem.find();

  res.render("problems", { 
    title: "problems",
    problems,
  });
}

async function getByEachId(req, res, next) {
  const { problemId } = res.locals;
  const problem = await Problem.findById(problemId);
  const tests = problem.tests.map(test => test.code);
  
  res.render("eachProblem", { 
    title: "problems",
    result: tests,
    code: "function solution() {}",
    problem,
  });
}

async function postByEachId(req, res, next) {
  const { problemId } = res.locals;
  const { userCode } = req.body;

  const problem = await Problem.findById(problemId);
  const tests = problem.tests;
  let result;
  
  const vm = new VM({
    timeout: 1000
  });

  try {
    for (const test of tests) {
      const script = userCode + test.code;
      result = await vm.run(script);

      if (result !== test.solution) {
        res.render("eachProblem", {
          result: `wrong answer: expected ${result} to be ${test.solution}`,
          problem,
          code: userCode,
        });
        return;
      }
    }

    await problem.addCompletedUser(req.user._id);

    res.render("eachProblem", {
      result: `CORRECT!`,
      problem,
      code: userCode,
    });
  } catch (error) {
    res.render("eachProblem", { 
      result: error,
      problem,
      code: userCode,
    });
  }
}

exports.getAll = getAll;
exports.getByEachId = getByEachId;
exports.postByEachId = postByEachId;
