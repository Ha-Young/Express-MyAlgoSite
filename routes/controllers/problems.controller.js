const Problem = require(`${__dirname}/../../models/Problem`);
const vm = require("vm");


exports.getProblem = async (req, res, next) => {
  const problem = await Problem.findOne({ id: Number(req.params.problem_id) }).exec();
  res.locals.problem = problem;
  res.render("problem");
};

exports.verifyUserCode = async (req, res, next) => {
  const { tests }
    = await Problem
      .findOne({ id: Number(req.params.problem_id) })
      .exec();

  const userCode = req.body.userCode;
  const contexts = tests.map(() => ({ userSolution: "undefined" }));
  const testScripts = tests.map(test => new vm.Script(`
      ${userCode};
      userSolution = ${test.code} || "undefined";
      solution = ${test.solution};
  `));
  try {
    contexts.forEach((context, index) => {
      testScripts[index].runInNewContext(context, {timeout: 2000, microtaskMode: "afterEvaluate"});
    });

    for (const { userSolution, solution } of contexts) {
      if (userSolution !== solution) {
        res.locals.failure = { solution: solution, userSolution: userSolution };
        return res.render("failure");
      }
    }

    return res.render("success");
  } catch (error) {
    res.locals.failure = { error: error.message };
    return res.render("failure");
  }
};