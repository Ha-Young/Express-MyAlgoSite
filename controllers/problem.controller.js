const { VM } = require("vm2");
const Problem = require("../models/Problem");

async function renderMain(req, res, next) {
  const problems = await Problem.find();

  res.render("problems", { 
    title: "problems",
    problems,
  });
}

async function renderEachProblem(req, res, next) {
  const { problemId } = res.locals;
  const problem = await Problem.findById(problemId);
  
  res.render("eachProblem", { 
    title: "problems",
    result: "> result will be here",
    code: "function solution() {}",
    problem,
  });
}

async function testUserCode(req, res, next) {
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

    problem.completedUsers.push(req.user._id);
    await problem.save();

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

exports.renderMain = renderMain;
exports.renderEachProblem = renderEachProblem;
exports.testUserCode = testUserCode;
