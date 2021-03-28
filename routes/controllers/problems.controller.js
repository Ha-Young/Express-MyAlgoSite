const createError = require("http-errors");

const Problem = require("../../models/Problem");
const getResult = require("../../utils/getResult");

exports.getAll = async function (req, res, next) {
  try {
    const problems = await Problem.find();
    res.render("index", { problems: problems, user: req.user });
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
};

exports.getProblem = async function (req, res, next) {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findById(problemId);
    res.render("problem", { problem: problem, user: req.user });
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
}

exports.postProblem = async function (req, res, next) {
  try {
    const userCode = req.body.solution;
    const problemId = req.params.problem_id;
    const userId = req.user._id;
    const problem = await Problem.findById(problemId);

    const solutionResult = getResult(userCode, problem);

    const {
      isAllPassed,
      hasSolutionError,
      resultList,
      errorMessage
    } = solutionResult;

    if (isAllPassed) {
      await Problem.findOneAndUpdate(
        { _id: problemId },
        { $addToSet: { completed_users: [ userId ] } },
        { new: true }
      );

      res.render("result", {
        isAllPassed,
        userCode: userCode,
        problem: problem,
        user: req.user,
      });

      return;
    }

    if (hasSolutionError) {
      res.render("result", {
        isAllPassed: false,
        hasSolutionError,
        message: errorMessage,
        userCode: userCode,
        problem: problem,
        user: req.user,
      });
    } else {
      res.render("result", {
        isAllPassed,
        hasSolutionError: false,
        resultList,
        userCode: userCode,
        problem: problem,
        user: req.user,
      });
    }
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
}
