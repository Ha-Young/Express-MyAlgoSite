const { VM } = require("vm2");

const problems = require("../models/sample_problems.json");

// util? middleware ?
function getEachProblemById(id) {
  return problems.find(problem => problem.id === Number(id));
}

function renderMain(req, res, next) {
  res.render("problems", { 
    title: "problems",
    problems,
  });
}

function renderEachProblem(req, res, next) {
  const { problemId } = res.locals;
  const problem = getEachProblemById(problemId);

  res.render("eachProblem", { 
    title: "problems",
    result: "> result will be here",
    problem,
    code: "function solution() {}",
  });
}

async function testUserCode(req, res, next) {
  const { problemId } = res.locals;
  const { userCode } = req.body;

  const problem = getEachProblemById(problemId);
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
