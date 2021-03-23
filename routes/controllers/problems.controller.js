const { NodeVM } = require("vm2");

const Problem = require("../../models/Problem");

exports.getAll = async function (req, res, next) {
  const problems = await Problem.find();

  res.render("index", { problems });
};

exports.detail = async function (req, res, next) {
  const problemId = req.params.problem_id;
  const problem = await Problem.findById(problemId);

  res.render("problems", { problem });
};

exports.checkCode = async function (req, res, next) {
  const problemId = req.params.problem_id;
  const submitText = req.body.submit_text;

  const vm = new NodeVM({
    console: 'inherit',
    sandbox: {},
  });

  const userCode = vm.run(`module.exports = ${submitText};`);

  try {
    const problem = await Problem.findById(problemId);
    const testCodes = problem.tests;
    let count = 0;

    for (let i = 0; i < testCodes.length; i++) {
      const testCode = testCodes[i].code;
      const correctValue = testCodes[i].solution;

      const result = vm.run(
        `const solution = ${userCode};
        module.exports = ${testCode};`
      );

      if (result !== correctValue) {
        return res.render("failure", { failProblem: testCode });
      }

      count++;
    }

    if (count === testCodes.length) {
      res.render("success");
    }

  } catch (error) {
    console.log(error.message);
  }
}
