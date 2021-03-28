const createError = require("http-errors");

const Problem = require("../../models/Problem");
const getResult = require("../../utils/getResult");

exports.getAll = async function (req, res, next) {
  try {
    const problems = await Problem.find();
    res.status(200);
    res.render("index", { problems, user: req.user });
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
};

exports.getProblem = async function (req, res, next) {
  try {
    const problemId = req.params.problem_id;
    const problem = await Problem.findById(problemId);
    res.status(200);
    res.render("problem", { problem, user: req.user });
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

    const { isAllPassed } = solutionResult;

    if (isAllPassed) {
      await Problem.findOneAndUpdate(
        { _id: problemId },
        { $addToSet: { completed_users: [ userId ] } },
      );

      res.status(200).render("result", {
        isAllPassed,
        userCode,
        problem,
        user: req.user,
      });

      return;
    }

    res.status(200).render("result", {
      ...solutionResult,
      userCode,
      problem,
      user: req.user,
    })
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
}
