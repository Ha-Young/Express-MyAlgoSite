const Problem = require("../../models/Problem");
const runVMTest = require("../../utils/testFetchCode");
const updateSuccessUser = require("../../utils/updateSuccessUser");

const PROBLEM_RESULT = require("../../constants/problemConstants");

const Controller = {};

Controller.getAll = async function (req, res, next) {
  try {
    const problems = await Problem.find();

    res.render("index", { problems });
  } catch (error) {
    next(error);
  }
};

Controller.detail = async function (req, res, next) {
  const problemId = req.params.problem_id;

  try {
    const problem = await Problem.findById(problemId);

    res.render("problems", { problem });
  } catch (error) {
    next(error);
  }
};

Controller.checkCode = async function (req, res, next) {
  const currentUserId = req.user.id;
  const problemId = req.params.problem_id;
  const submitCode = req.body.submit_text;

  try {
    const problem = await Problem.findById(problemId);
    const testCodes = problem.tests;
    let results;
    let isFail = false;

    results = runVMTest(submitCode, testCodes);

    if (!Array.isArray(results)) {
      return res.render("failure",
        {
          userCode: submitCode,
          testCase: [],
          error: results,
        }
      );
    }

    results.forEach(result => {
      if (result.status === PROBLEM_RESULT.FAIL) {
        isFail = true;
      }
    });

    if (isFail) {
      return res.render("failure",
        {
          userCode: submitCode,
          testCase: results,
          error: null,
        }
      );
    }

    updateSuccessUser(problem, currentUserId);

    res.render("success",
      {
        userCode: submitCode,
        testCase: results,
      }
    );
  } catch (error) {
    next(error);
  }
}

module.exports = Controller;
