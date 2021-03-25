const Problem = require("../../models/Problem");
const { VM } = require("vm2");

exports.renderProblemPageById = async function (req, res, next) {
  const requestedId = req.params.id;
  const fetchedProblem = await Problem.findById(requestedId);

  res.status(200).render("problem", { problem: fetchedProblem });
};

exports.getUserScript = async function (req, res, next) {
  try {
    const requestedId = req.params.id;
    const fetchedProblem = await Problem.findById(requestedId);
    const fetchedTests = fetchedProblem.tests;
    const userScript = req.body.solution;

    const testResults = runTest(fetchedTests, userScript);
    console.log("testResults", testResults);

    isAllPassed(testResults)
      ? res.status(200).render("sucess", { testResults: testResults })
      : res.status(200).render("failure", { testResults: testResults });
  } catch (error) {
    next("server Error");
  }
};

function checkUserSolution(userSolutionResult, testSolutionResult) {
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

      const testResult = checkUserSolution(
        userSolutionResult,
        testSolutionResult
      );

      testResults.push(testResult);
    });

    return { runSuccess: true, result: testResults };
  } catch (error) {
    return { runSuccess: false, result: error.message };
  }
}
