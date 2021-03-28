const Problem = require("../../models/Problem");
const testuserSubmitCode = require("../../utils/testuserSubmitCode");
const updateSuccessUser = require("../../utils/updateSuccessUser");
const handleError = require("../../utils/handleError");

const PROBLEM = require("../../constants/problemConstants");

const Controller = {};

Controller.getAll = async function (req, res, next) {
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

    let isFail = false;

    const results = testuserSubmitCode(userSubmitCode, testCases);

    if (results.hasOwnProperty(PROBLEM.ERROR)) {
      return res.render("failure",
        {
          userCode: userSubmitCode,
          testCase: [],
          error: results.error,
        }
      );
    }

    results.forEach(result => {
      if (result.status === PROBLEM.FAIL) {
        isFail = true;
      }
    });

    if (isFail) {
      return res.render("failure",
        {
          userCode: userSubmitCode,
          testCase: results,
          error: null,
        }
      );
    }

    updateSuccessUser(problem, currentUserId);

    res.render("success",
      {
        userCode: userSubmitCode,
        testCase: results,
      }
    );
  } catch (error) {
    next(handleError(500, error));
  }
};

module.exports = Controller;
