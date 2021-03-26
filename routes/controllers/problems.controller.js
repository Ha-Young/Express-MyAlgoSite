const { VM } = require("vm2");

const Problem = require("../../models/Problem");

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
  const problemId = req.params.problem_id;
  const submitCode = req.body.submit_text;
  const vm = new VM({
    sandbox: {},
    timeout: 10000,
    fixAsync: true,
    wasm: false,
  });

  try {
    const problem = await Problem.findById(problemId);
    const testCodes = problem.tests;
    const results = [];
    let isFail = false;

    for (let i = 0; i < testCodes.length; i++) {
      const currentTestCode = testCodes[i];
      const testCode = currentTestCode.code;
      const correctValue = currentTestCode.solution;

      try {
        const result = vm.run(
          `solution = ${submitCode};

          ${testCode};`
        );

        if (result !== correctValue) {
          const failTestCode = {
            solution: currentTestCode.code,
            resultValue: String(result),
            status: PROBLEM_RESULT.FAIL,
          };

          isFail = true;
          results.push(failTestCode);
        } else {
          const successTestCode = {
            solution: currentTestCode.code,
            resultValue: String(result),
            status: PROBLEM_RESULT.SUCCESS,
          };

          results.push(successTestCode);
        }
      } catch (userSolutionError) {
        return res.render("failure", {
          userCode: submitCode,
          testCase: results,
          error: userSolutionError.message,
        });
      }
    }

    if (isFail) {
      return res.render("failure", {
        userCode: submitCode,
        testCase: results,
        error: null,
      });
    }

    const currentUserId = req.user.id;
    const checkSuccessUser = problem.completed_list.some(userId => {
      return userId === currentUserId;
    });

    if (!checkSuccessUser) {
      problem.completed_users += PROBLEM_RESULT.INCREASE_VALUE;
      problem.completed_list.push(currentUserId);

      await problem.save();
    }

    res.render("success", {
      userCode: submitCode,
      testCase: results,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = Controller;
