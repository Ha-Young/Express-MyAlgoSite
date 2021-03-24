const Problem = require("../models/Problem");
const vm = require("vm");

module.exports.problemDetailController = async function problemDetailController(req, res, next) {
  const problemId = req.params.problem_id;
  if (!problemId.match(/^[0-9a-fA-F]{24}$/)) {
    return next();
  }

  const problem = await Problem.findById(problemId);
  if (!problem) {
    return res.redirect("/");
  }

  console.log(problem);

  res.render("problemDetail",{ problem, initCode: "function solution() {\n\n}", failure: '', success: '' });
}

module.exports.postProblemDetailController = async function postProblemDetailController(req, res, next) {
  const {
    body: { userCode }
  } = req;
  const newUserCode = userCode.concat("\nsolution()");
  console.log(newUserCode);
  try {
    const using = vm.runInThisContext(newUserCode);
    console.log('result', using);
  } catch (err) {
    console.log('err log', err.message);
    next(err);
  }
}
