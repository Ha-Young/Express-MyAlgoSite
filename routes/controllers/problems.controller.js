const vm = require("vm");
const Problem = require("../../models/Problem");
const createError = require("http-errors");

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();
    const { user } = req;

    res.render("index", { title: "바닐라코딩", problems, user });
  } catch (error) {
    next(createError(500));
  }
};

exports.getProblem = async (req, res, next) => {
  try {
    const {
      params: { problem_id: problemId },
      user,
    } = req;
    const problem = await Problem.findById(problemId);

    res.status(200).render("problem", { problem, user });
  } catch (error) {
    next(error);
  }
};

exports.postSolution = async (req, res, next) => {
  try {
    const {
      params: { problem_id: problemId },
      body: { solution: [ userCode ] },
      user,
    } = req;

    const problem = await Problem.findById(problemId);

    const { isPassed, log, error } = checkSolution(problem.tests, userCode);

    if (error) {
      res.status(400).render("failure", { message: "Failure", error, problem, user, userCode });
      return;
    }

    if (isPassed) {
      res.status(200).render("success", { message: "Success", log, problem, user, userCode });
      return;
    }

    res.status(200).render("failure", { message: "Failure", log, problem, user, userCode });
  } catch (error) {
    next(error);
  }
};

function checkSolution(tests, solution) { // typecheck, 수정도 해야함..
  const log = [];
  let error;

  tests.forEach((test) => {
    try {
      const script = solution + test.code;
      const usingScript = vm.runInNewContext(script);

      if (usingScript === test.solution) {
        log.push({
          result: "SUCCESS",
          case: test.code,
          answer: usingScript,
        });
      } else {
        log.push({
          result: "FAILURE",
          case: test.code,
          answer: test.solution,
          wrongAnswer: usingScript,
        });
      }
    } catch (err) {
      error = err;
    }
  });

  const isPassed = log.every((data) => "SUCCESS" === data.result);

  return { isPassed, log, error };
}
