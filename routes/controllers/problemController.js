const { VM } = require("vm2");
const createError = require("http-errors");

const Problem = require("../../models/Problem");
const errorMessage = require("../../constants/errorMessage");
const User = require("../../models/User");

exports.renderProblemPageById = async function (req, res, next) {
  try {
    const requestedId = req.params.id;
    const fetchedProblem = await Problem.findById(requestedId);
    res.status(200).render("problem", { problem: fetchedProblem });
  } catch (error) {
    const createdError = createError(500, errorMessage.SERVER_ERROR);
    return next(createdError);
  }
};

exports.getUserScript = async function (req, res, next) {
  console.log(req.user);
  try {
    const requestedId = req.params.id;
    const fetchedProblem = await Problem.findById(requestedId);
    const fetchedTests = fetchedProblem.tests;

    const userScript = req.body.solution;
    const testResults = runTest(fetchedTests, userScript);

    if (isAllPassed(testResults)) {
      const findedUser = await User.findById(req.user._id);
      await findedUser.completedProblems.push(fetchedProblem);
      await findedUser.save();

      return res.status(200).render("sucess", { testResults });
    }

    res.status(200).render("failure", { testResults });
  } catch (error) {
    const createdError = createError(500, errorMessage.SERVER_ERROR);
    next(createdError);
  }
};

function isPassedTest(userSolutionResult, testSolutionResult) {
  return userSolutionResult === testSolutionResult ? true : false;
}

function isAllPassed(testResults) {
  if (!testResults.runSuccess) {
    return false;
  }

  return testResults.result.every((result) => result === true);
}

function runTest(fetchedTests, userScript) {
  const vm2 = new VM();
  const testResults = [];

  try {
    fetchedTests.forEach((test) => {
      const testScript = test.code;
      const testSolutionResult = test.solution;
      const userSolution = userScript + testScript;
      const userSolutionResult = vm2.run(userSolution);

      const testResult = isPassedTest(userSolutionResult, testSolutionResult);

      testResults.push(testResult);
    });

    return { runSuccess: true, result: testResults };
  } catch (error) {
    return { runSuccess: false, result: error.message };
  }
}
