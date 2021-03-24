const Problem = require("../../models/Problem");
const { NodeVM, VMScript } = require("vm2");

exports.getProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find();
    res.render("index", { problems });
  } catch (err) {
    next(err);
  }
};

exports.getOneProblem = async (req, res, next) => {
  const id = req.params.problem_id;

  try {
    const problem = await Problem.findById(id);
    res.render("problem", { problem });
  } catch (err) {
    next(err);
  }
};

exports.submitProblem = async (req, res, next) => {
  const id = req.params.problem_id;
  const code = req.body.code;

  try {
    const problem = await Problem.findById(id);
    const tests = problem.tests;
    const result = checkSolution(tests, code);

    if (Array.isArray(result.resultList)) {
      const isFailed = result.resultList.indexOf("failure");

      if (isFailed > -1) {
        res.render("solutionResult", {
          tests,
          resultList: result.resultList,
          answerList: result.answerList
        });
        return;
      }

      res.render("success", {
        message: "SUCCESS"
      });

      return;
    }

    res.render("solutionResult", {
      resultList: null,
      answerList: null,
      error: result
    });

  } catch(err) {
    next(err);
  }
};

function checkSolution (tests, code) {
  const solution = {};
  const vm = new NodeVM({
    console: "inherit",
    compiler: "javascript",
    timeout: 5000,
    require: { external: false },
    sandbox: {
      solution
    }
  });

  try {
    const resultList = [];
    const answerList = [];

    vm.run(`
      solution = ${code};
    `);

    for (const test of tests) {
      const testCode = test.code;
      const result = vm.run(`
        module.exports = ${testCode};
      `);

      if (result != test.solution) {
        resultList.push("failure");
      } else {
        resultList.push("success");
      }
      answerList.push(result);
    }

    return { resultList, answerList };
  } catch (err) {
    return err;
  }
}
