const createError = require("http-errors");
const Problem = require(`${__dirname}/../../models/Problem`);
const vm = require("vm");

exports.getProblem = async (req, res, next) => {
  const problemId = req.params.problem_id;
  const isContinuedProblem
    = !!req.session.problem
    && req.session.problem._id === problemId;
  let problem;

  if (!isContinuedProblem) {
    delete req.session.userCode;

    try {
      problem = await Problem.findById(problemId).exec();
      req.session.problem = problem;
    } catch (error) {
      console.error(error);

      return next(createError(404));
    }
  } else {
    problem = req.session.problem;
  }

  res.locals= {
    problem,
    codesInTextarea: req.session.userCode || "function solution(n) {}",
    isLogin: res.app.locals.isLogin,
    success: null,
    failure: null,
  };

  return res.render("problem");
};

exports.verifyUserCode = (req, res, next) => {
  const { tests } = req.session.problem;
  const userCode = req.body.userCode;
  req.session.userCode = userCode;
  res.locals = {
    problem: req.session.problem,
    codesInTextarea: req.session.userCode || "function solution(n) {}",
    isLogin: res.app.locals.isLogin,
    success: null,
    failure: null,
  };

  try {
    const contexts = tests.map(() => ({}));
    const testScripts = tests.map(test => new vm.Script(`
        ${userCode}
        var userSolution = "" + ${test.code} || "undefined";
        var solution = "${test.solution}";
    `));

    const testOptions = {
      timeout: 1000,
      microtaskMode: "afterEvaluate",
    };
    contexts.forEach((context, index) => {
      testScripts[index].runInNewContext(context, testOptions);
    });

    for (const { userSolution, solution } of contexts) {
      if (userSolution !== solution) {
        const failure = { solution, userSolution };
        Object.assign(res.locals, { failure });

        return res.render("problem");
      }
    }

    Object.assign(res.locals, { success: contexts });

    return res.render("problem");
  } catch (error) {
    debugger;
    const failure = { error: error.message };
    Object.assign(res.locals, { failure });

    return res.render("problem");
  }
};