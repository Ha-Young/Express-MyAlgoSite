const Problem = require("../models/Problem");
const vm = require("vm");

exports.getProblem =  async (req, res, next) => {
  const problemId = req.params.problem_id;
  const problem = await Problem.find({ _id: problemId });

  const {
    title,
    completed_users,
    difficulty_level,
    description
  } = problem[0];

  res.render("problem", {
    title,
    problemId,
    completed_users,
    difficulty_level,
    description
  });
};

exports.checkSolution = async (req, res, next) => {
  const func = req.body.solution;
  const problemId = req.params.problem_id;
  const problem = await Problem.find({ _id: problemId });
  const tests = problem[0].tests;
  const resultArr = [];
  const sandbox = {
    result: null
  };

  let isSolutionWrong = false;

  try {
    for (let i = 0; i < tests.length; i ++) {
      const code = func + `result = ${tests[i].code}`;
      const context = new vm.createContext(sandbox);
      const script = new vm.Script(code);

      const result = script.runInContext(context, { timeout: 5000 });

      resultArr.push(result);

      if (sandbox.result !== tests[i].solution) {
        isSolutionWrong = true;
      }
    }

    if (isSolutionWrong) {

      res.render("failure", {
        resultArr,
        tests
      });

      return;
    }

    await Problem.findOneAndUpdate(
      { _id: problemId },
      { $addToSet: { solved_users: [ req.user ] } },
      { new: true }
    );

    res.render("success", {
      resultArr,
      tests
    });
  } catch (err) {
    const { message, name } = err;

    res.render("error", {
      message,
      name
    });
  }
};
