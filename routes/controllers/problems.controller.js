const Problem = require("../../models/Problem");
const testFetchedCode = require("../../utils/testFetchedCode");
const updateSuccessUser = require("../../utils/updateSuccessUser");

const PROBLEM = require("../../constants/problemConstants");

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
  const fetchedCode = req.body.submit_text;

  try {
    const problem = await Problem.findById(problemId);
    const testCases = problem.tests;

    let results;
    let isFail = false;

    results = testFetchedCode(fetchedCode, testCases);

    if (results.hasOwnProperty(PROBLEM.ERROR)) {
      return res.render("failure",
        {
          userCode: fetchedCode,
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
          userCode: fetchedCode,
          testCase: results,
          error: null,
        }
      );
    }

    updateSuccessUser(problem, currentUserId);

    res.render("success",
      {
        userCode: fetchedCode,
        testCase: results,
      }
    );
  } catch (error) {
    next(error);
  }
}

module.exports = Controller;
