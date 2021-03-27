const createError = require("http-errors");
const { VM } = require("vm2");

const Problem = require("../models/Problem");

const TEXTS = {
  DEFAULT_FUNCITION: "function solution() {}",
  RESULT: (wrong, correct) => `Wrong Answer: expected ${wrong} to be ${correct}`,
  CORRECT: "CORRECT!",
};

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

async function getTestResult(userCode, tests) {
  const vm = new VM({
    timeout: 1000,
  });

  try {
    for (const test of tests) {
      const { code: testCode, solution } = test;
      const script = userCode + testCode;

      result = await vm.run(script);

      if (result !== solution) {
        return {
          isCorrect: false,
          result: TEXTS.RESULT(result, solution),
        };
      }
    }

    return {
      isCorrect: true,
      result: TEXTS.CORRECT,
    };
  } catch (error) {
    return {
      isCorrect: false,
      result: error,
    };
  }
}

async function postByEachId(req, res, next) {
  const { problemId } = res.locals;
  const { userCode } = req.body;

  const problem = await Problem.findById(problemId);
  const tests = problem.tests;

  try {
    const { isCorrect, result } = await getTestResult(userCode, tests);
    
    if (isCorrect) {
      await problem.addCompletedUser(req.user._id);
    }

    res.render("eachProblem", {
      code: userCode,
      result,
      problem,
    });
  } catch (error) {
    next(createError(500, error));
  }
}

exports.getAll = getAll;
exports.getByEachId = getByEachId;
exports.postByEachId = postByEachId;
