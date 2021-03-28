const Problem = require("../../models/Problem");
const testuserSubmitCode = require("../../utils/testuserSubmitCode");
const updateSuccessUser = require("../../utils/updateSuccessUser");
const handleError = require("../../utils/handleError");

const PROBLEM = require("../../constants/problemConstants");

const Controller = {};

Controller.getAllProblems = async function (req, res, next) {
  try {
    const problems = await Problem.find();

    res.render("index", { problems });
  } catch (error) {
    next(handleError(500, error));
  }
};

Controller.showProblem = async function (req, res, next) {
  const problemId = req.params.problem_id;

  try {
    const problem = await Problem.findById(problemId);

    res.render("problem", { problem });
  } catch (error) {
    next(handleError(500, error));
  }
};

Controller.checkCode = async function (req, res, next) {
  const currentUserId = req.user.id;
  const problemId = req.params.problem_id;
  const userSubmitCode = req.body.submit_text;

  try {
    const problem = await Problem.findById(problemId);
    const testCases = problem.tests;

    const results = testuserSubmitCode(userSubmitCode, testCases);

    const isFail = results.some(result =>
      result.status === PROBLEM.FAIL
    );

    if (isFail) {
      return res.render("failure",
        {
          userCode: userSubmitCode,
          results,
        }
      );
    }

    updateSuccessUser(problem, currentUserId);

    res.render("success",
      {
        userCode: userSubmitCode,
        results,
      }
    );
  } catch (error) {
    next(handleError(500, error));
  }
};

module.exports = Controller;
