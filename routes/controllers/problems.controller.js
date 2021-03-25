const createError = require("http-errors");
const Problem = require(`${__dirname}/../../models/Problem`);
const vm = require("vm");


exports.getProblem = async (req, res, next) => {
  const problemId = req.params.problem_id;
  let problem;

  try {
    problem = await Problem.findById(problemId).exec();

    if (!problem) return next(createError(404));

    req.session.problem = problem;
  } catch(error) {
    console.error(error);
    return next(createError(500));
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
    codesInTextarea: req.session.userCode,
  };

  const contexts = tests.map(() => ({}));
  const testScripts = tests.map(test => new vm.Script(`
      ${userCode};
      var time = 0;
      for (let i = 0; i < 10; i++) {
        const start = Date.now();
        var userSolution = ${test.code} || "undefined";
        time += Date.now() - start;
      }
      time = Number((time / 10 * 2.1).toFixed(4)) ;
      var solution = ${test.solution};
  `));
  try {
    contexts.forEach((context, index) => {
      testScripts[index].runInNewContext(context, {timeout: 20000, microtaskMode: "afterEvaluate"});
    });

    for (const { userSolution, solution, time } of contexts) {
      if (time >= 1000) {
        Object.assign(
          res.locals,
          { failure: { error: "Time Limit Exceed" } }
        );

        return res.render("problem");
      } else if (userSolution !== solution) {
        Object.assign(
          res.locals,
          { failure: { solution, userSolution, time } }
        );

        return res.render("problem");
      }
    }
    Object.assign(
      res.locals,
      { success: { contexts } }
    );

    return res.render("problem");
  } catch (error) {
    Object.assign(
      res.locals,
      { failure: { error: error.message } }
    );

    return res.render("problem");
  }
};