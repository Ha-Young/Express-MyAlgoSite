const Problem = require("../../models/Problem");
const { VM } = require("vm2");
const vm = require("vm");

exports.renderProblemPageById = async function (req, res, next) {
  console.log("global", global);

  const requestedId = req.params.id;
  const fetchedProblem = await Problem.findById(requestedId);

  res.status(200).render("problem", { problem: fetchedProblem });
};

exports.checkUserSolution = async function (req, res, next) {
  const requestedId = req.params.id;
  const fetchedProblem = await Problem.findById(requestedId);
  const tests = fetchedProblem.tests;

  const vm2 = new VM();
  const submittedCodeByUser = req.body.solution;

  const testResult = [];

  tests.forEach((test, index) => {
    try {
      const executionTest = test.code;
      const testSolution = test.solution;
      const runTest = submittedCodeByUser + executionTest;
      const userSolution = vm2.run(runTest);
      console.log("user code solution is", userSolution);

      if (userSolution === testSolution) {
        testResult.push(true);
        console.log("passed case index", index);
      } else {
        testResult.push(false);
        console.log("fail case index", index);
      }
    } catch (err) {
      next("Failed to execute script. Error in vm2");
    }
  });

  console.log(testResult);

  res.status(200).render("problem", { problem: fetchedProblem });
};
