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
          `const solution = ${submitText};
          module.exports = ${testCode};`
        );

        if (result !== correctValue) {
          const failTestCode = { solution: currentTestCode.code, results: "fail" };

          isFail = true;
          results.push(failTestCode);
        } else {
          const successTestCode = { solution: currentTestCode.code, results: "success" };

          results.push(successTestCode);
        }
      } catch (error) {

      }
    }

    res.render("success",
      {
        userCode: submitText,
        testCase: results,
      }
    );
  } catch (error) {
    next(error);
  }
}
