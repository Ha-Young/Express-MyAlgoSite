const Problem = require("../../models/Problem");
const { VM } = require("vm2");
const createError = require("http-errors");

exports.getAll = async function (req, res, next) {
  await Problem.find()
    .lean()
    .exec((err, problems) => {
      if (!problems.length) return res.status(500).send(err);
      res.render("index", { problems });
    });
};

exports.showProblem = async function (req, res, next) {
  const { problem_id: problemId } = req.params;

  await Problem.findById(problemId)
    .exec((err, problem) => {
      if (err) return res.status(400).json({ error: "invalid problem id" });
      res.render("problem", { problem });
    });
};

exports.checkCode = async function (req, res, next) {
  const { submissionCode } = req.body;
  const { problem_id: problemId } = req.params;

  const vm = new VM({
    timeout: 1000,
    sandbox: {},
  });

  await Problem.findById(problemId)
    .lean()
    .exec((err, problem, next) => {
      if (err) next(createError(400, err, { message: "invalid article id" }));
      try {
        const { tests } = problem;
        const testResults = tests.reduce(
          (results, test) => {
            const { code, solution } = test;
            const executionResult = vm.run(`
              ${submissionCode}
              ${code}
            `);

            executionResult === solution ?
              results.push("Success") :
              results.push("Failure");

            return results;
        }, []);

        if (testResults.includes("Failure")) {
          res.render("failure", { testResults });
        } else {
          res.render("success", { testResults });
        }
      } catch (err) {
        res.render("failure", { error: err });
      }
    });
};
