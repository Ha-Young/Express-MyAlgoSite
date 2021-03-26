const createError = require("http-errors");
const { VM } = require("vm2");
const Problem = require("../models/Problem");

const TEXTS = {
  DEFAULT_FUNCITION: "function solution() {}",
  RESULT: (wrong, correct) => `Wrong Answer: expected ${wrong} to be ${correct}`,
  CORRECT: "CORRECT!",
}

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
    result: tests,
    code: TEXTS.DEFAULT_FUNCITION,
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
    timeout: 1000,
  });

  try {
    for (const test of tests) {
      const { code: testCode, solution } = test;
      const script = userCode + testCode;

      result = await vm.run(script);

      if (result !== solution) {
        res.render("eachProblem", {
          result: TEXTS.RESULT(result, solution),
          code: userCode,
          problem,
        });
        return;
      }
    }

    try {
      await problem.addCompletedUser(req.user._id);
    } catch (error) {
      next(createError(500));
      return;
    }

    res.render("eachProblem", {
      result: TEXTS.CORRECT,
      code: userCode,
      problem,
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
