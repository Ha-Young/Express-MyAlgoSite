const createError = require("http-errors");

const Problem = require("../../models/Problem");

const { checkSolution } = require("../../services/problemService");

exports.getAllProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();
    const { user } = req;

    res.status(200).render("index", { message: "CodeWars", problems, user });
  } catch (error) {
    next(error);
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
    next(createError(error));
  }
};

exports.postSolution = async (req, res, next) => {
  try {
    const {
      params: { problem_id: problemId },
      body: {
        solution: [userCode, testCode],
      },
      user,
    } = req;

    const problem = await Problem.findById(problemId);

    const { isPassed, log, error } = checkSolution(
      problem.tests,
      userCode,
      testCode
    );

    if (error) {
      res
        .status(400)
        .render("failure", {
          message: "Failure",
          error,
          userCode,
          user,
          problem,
        });
      return;
    }

    if (isPassed) {
      res
        .status(200)
        .render("success", {
          message: "Success",
          log,
          userCode,
          user,
          problem,
        });
      return;
    }

    res
      .status(200)
      .render("failure", { message: "Failure", log, userCode, user, problem });
  } catch (error) {
    next(createError(error));
  }
};
