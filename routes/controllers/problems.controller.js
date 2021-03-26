const { VM } = require("vm2");

const createError = require("http-errors");
const mongoose = require("mongoose");

const Problem = require("../../models/Problem");

const ERROR = require("../../constants/errorConstants");
const PROBLEM_RESULT = require("../../constants/problemConstants");

const Controller = {};

Controller.getAll = async function (req, res, next) {
  try {
    const problems = await Problem.find();

    res.render("index", { problems });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return next(createError(500, ERROR.DATABASE_MESSAGE));
    }

    next(createError(500, ERROR.SERVER_MESSAGE));
  }
};

Controller.detail = async function (req, res, next) {
  const problemId = req.params.problem_id;

  try {
    const problem = await Problem.findById(problemId);

    res.render("problems", { problem });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return next(createError(500, ERROR.DATABASE_MESSAGE));
    }

    next(createError(500, ERROR.SERVER_MESSAGE));
  }
};

Controller.checkCode = async function (req, res, next) {
  const problemId = req.params.problem_id;
  const submitText = req.body.submit_text;
  const vm = new VM({
    sandbox: {},
    timeout: 10000,
    fixAsync: true,
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
          `solution = ${submitText};

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
      } catch (error) {
        return res.render("failure", {
          userCode: submitText,
          testCase: results,
          error: error.message,
        });
      }
    }

    if (isFail) {
      return res.render("failure", {
        userCode: submitText,
        testCase: results,
        error: null,
      });
    }

    const currentUserId = req.user.id;
    const checkSuccessUser = problem.completed_list.some(userId => {
      return userId === currentUserId;
    });

    if (!checkSuccessUser) {
      problem.completed_users += 1;
      problem.completed_list.push(currentUserId);

      await problem.save();
    }

    res.render("success", {
      userCode: submitText,
      testCase: results,
    });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return next(createError(400, ERROR.DATABASE_MESSAGE));
    }

    next(createError(500, ERROR.SERVER_MESSAGE));
  }
}

module.exports = Controller;
