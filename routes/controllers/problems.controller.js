const Problem = require(`${__dirname}/../../models/Problem`);
const vm = require("vm");


exports.getProblem = async (req, res, next) => {
  const problem = await Problem.findOne({ id: Number(req.params.problem_id) }).exec();
  res.locals.problem = problem;
  res.render("problem");
};

exports.verifyUserCode = async (req, res, next) => {
  const { tests } = await Problem.findOne({ id: Number(req.params.problem_id) }).exec();

  const userCode = req.body.userCode;
  const contexts = tests.map(() => ({ result: null }));
  const testScripts = tests.map(test => new vm.Script(`
      ${userCode};
      result = ${test.code} || null;
      solution = ${test.solution};
  `));
  try {
    contexts.forEach((context, index) => {
      testScripts[index].runInNewContext(context, {timeout: 2000, microtaskMode: "afterEvaluate"});
    });
  } catch (error) {
    console.log(error);
  }

  console.log(contexts);

};