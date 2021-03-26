const createError = require("http-errors");
const stripAnsi = require("strip-ansi");
const { VM } = require("vm2");
const assert = require("assert");

const getProblemById = require("../util/getProblemById");

const submitted = {};
const vm = new VM({
  console: "inherit",
  sandbox: { submitted },
  timeout: 5000,
});

exports.get = async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const user = await req.user;
    const problem = await getProblemById(problemId);
    const flashContent = req.flash("codes")[0];
    const triedProblem = user.problems.find(
      (problem) => problem.problemId.toString() === problemId
    );

    if (!problem) {
      next(createError(400, "invalid problem id"));
      return;
    }

    const isSolved = triedProblem ? triedProblem.isSolved : false;

    res.render("problem", {
      email: user.email,
      problem,
      isSolved,
      codes:
        flashContent ||
          { code: triedProblem ? triedProblem.code : "function solution(arg){\n  // Your code...\n}", log: [] },
    });
  } catch (err) {
    next(createError(500, err.message));
  }
};

exports.submit = async (req, res, next) => {
  try {
    const problemId = req.params.problem_id;
    const code = req.body.code.trim();

    const currentProblem = await getProblemById(problemId);
    if (!currentProblem) {
      next(createError(400, "invalid problem id"));
      return;
    }

    let testResult = true;
    let functionCallMessage = "";
    try {
      const tests = currentProblem.tests;
      vm.run(`submitted.log = []`);
      vm.run(`
        console.log = (message) => {
          submitted.log.push(message);
          if (submitted.log.length > 50) {
            throw new Error("too long log");
          }
        };
      `);
      for (const test of tests) {
        functionCallMessage = test.code;
        const result = vm.run(`${code} ${test.code}`);
        assert.deepStrictEqual(result, test.solution);

        submitted.log.push("-----------------");
      }
    } catch (err) {
      testResult = false;
      req.flash("codes", {
        result: `>> ${functionCallMessage}\n${err.name} : ${stripAnsi(err.message)}\n`,
        log: submitted.log,
        code,
      });
    }


    const problem = {
      title: currentProblem.title,
      problemId,
      isSolved: testResult,
      code,
    };
    const user = await req.user;
    const triedProblem = user.problems.find(
      (problem) => problem.problemId.toString() === problemId
    );

    const hasAlreadySolved = triedProblem ? triedProblem.isSolved : false;

    if (testResult) {
      if (!hasAlreadySolved) {
        currentProblem.completed_users += 1;
        await currentProblem.save();
      }

      await user.updateOne({ $pull: { problems: { problemId, } } });
      await user.updateOne({ $push: { problems: problem } });

      req.flash("codes", {
        result: "Success! Congratulations!!",
        log: submitted.log,
        code,
      });
    } else {
      if (!hasAlreadySolved) {
        await user.updateOne({ $pull: { problems: { problemId, } } });
        await user.updateOne({ $push: { problems: problem } });
      }
    }
    res.redirect(`/problems/${problemId}`);
  } catch (err) {
    next(createError(500, err.message));
  }
};
