const Problem = require("../../models/Problem");
const { VM } = require("vm2");
const deepEqual = require("fast-deep-equal");

exports.getProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find();
    res.render("index", {
      problems,
      nickname: req.user.userNickname
    });
  } catch (err) {
    next(err);
  }
};

exports.getOneProblem = async (req, res, next) => {
  const id = req.params.problem_id;

  try {
    const problem = await Problem.findById(id);
    res.render("problem", {
      problem,
      nickname: req.user.userNickname
    });
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
          id,
          code,
          tests,
          resultList: result.resultList,
          answerList: result.answerList,
          nickname: req.user.userNickname
        });
        return;
      }

      res.render("success", {
        message: "SUCCESS",
        nickname: req.user.userNickname
      });

      return;
    }

    res.render("solutionResult", {
      id,
      code,
      resultList: null,
      answerList: null,
      error: result,
      nickname: req.user.userNickname
    });

  } catch(err) {
    next(err);
  }
};

function checkSolution (tests, code) {
  const vm = new VM({
    console: "inherit",
    compiler: "javascript",
    timeout: 5000,
    require: { external: false }
  });

  try {
    const resultList = [];
    const answerList = [];

    for (const test of tests) {
      const testCode = code + test.code;
      const result = vm.run(testCode);
      const compareResult = deepEqual(result, JSON.parse(test.solution));

      if (compareResult) {
        resultList.push("success");
      } else {
        resultList.push("failure");
      }
      answerList.push(result);
    }

    return { resultList, answerList };
  } catch (err) {
    return err;
  }
}
