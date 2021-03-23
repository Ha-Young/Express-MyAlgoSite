const vm = require("vm");
const Problem = require("../../models/Problem");
const createError = require("http-errors");

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();

    res.render("index", { title: "바닐라코딩", problems, });
  } catch (error) {
    next(createError(500));
  }
};

exports.getProblem = async (req, res, next) => {
  try {
    const { problem_id: problemId } = req.params;
    const problem = await Problem.findById(problemId);

    res.status(200).render("problem", { problem });
  } catch (error) {
    next(error);
  }
};

exports.postSolution = async (req, res, next) => {
  try {
    const {
      params: { problem_id: problemId },
      body: { solution },
    } = req;
    const problem = await Problem.findById(problemId);

    const { isPassed, log, error } = checkSolution(problem.tests, solution);

    if (error) {
      res.status(400).render("failure", { message: "Failure", error, problemId });
      return;
    }

    if (isPassed) {
      res.status(200).render("success", { message: "Success", log });
      return;
    }

    res.status(200).render("failure", { message: "Failure", log, problemId });
  } catch (error) {
    next(error);
  }
};

function checkSolution(tests, solution) { // typecheck
  try {
    const log = [];

    tests.forEach((test) => {
      const script = solution + test.code;
      const usingScript = vm.runInNewContext(script, {});

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
    });

    const isPassed = log.every((data) => "SUCCESS" === data.result);

    return { isPassed, log };
  } catch (error) {
    return { error };
  }
}
