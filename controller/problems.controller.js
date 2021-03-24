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
    const flashContents = req.flash("result")[0];

    console.log(flashContents);

    if (!problem) {
      next(createError(400, "invalid problem id"));
      return;
    }

    res.render("problem", {
      email: user.email,
      problem,
      result: flashContents,
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
    try {
      const tests = currentProblem.tests;
      vm.run(`submitted.log = []`);
      vm.run(`
        console.log = (message) => {
          submitted.log.push(message)
          if (submitted.log.length > 50) {
            throw new Error("too long log");
          }
        };
      `);
      vm.run(`submitted.solution = ${code}`);

      for (const test of tests) {
        vm.run(`submitted.log = []`);
        const result = vm.run(`submitted.${test.code}`);
        assert.deepStrictEqual(result, test.solution);
      }
    } catch (err) {
      testResult = false;
      req.flash("result", {
        result: `${err.name} : ${stripAnsi(err.message)}`,
        log: submitted.log,
        code,
      });
    }

    if (testResult) {
      req.flash("result", {
        result: "Success!",
        log: submitted.log,
        code,
      });
    }
    res.redirect(`/problems/${problemId}`);
  } catch (err) {
    next(createError(500, err.message));
  }
};

