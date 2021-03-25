const vm = require("vm");
const Problem = require("../models/Problem");
const { getArrayParamString } = require("../utils/utils");

module.exports.problemDetailController = async function problemDetailController(req, res, next) {
  const problemId = req.params.problem_id;
  if (!problemId.match(/^[0-9a-fA-F]{24}$/)) {
    return next();
  }

  const problem = await Problem.findById(problemId);
  if (!problem) {
    return res.redirect("/");
  }

  res.render("problemDetail",{ problem, initCode: "function solution() {\n\n}", failure: '', success: '', results: [] });
}

module.exports.postProblemDetailController = async function postProblemDetailController(req, res, next) {
  const {
    body: { userCode },
    params: { problem_id }
  } = req;
  const problem = await Problem.findById(problem_id);

  try {
    let isSuccess = true;
    const resultArr = problem.testCases.map((testcase, i) => {
      let param = testcase.testcase;
      if (Array.isArray(param)) {
        param = getArrayParamString(param);
      }

      const context = userCode.concat(`\nsolution(${param})`);
      const result = vm.runInNewContext(context);
      if (testcase.answer === result) {
        return { index: i, message: "Success!"}
      }

      isSuccess = false;
      return { index: i, message: "Fail...!"};
    });

    if (isSuccess) {
      return res.render('problemDetail', { problem, initCode: userCode, failure: '', success: 'success', results: resultArr });
    }

    res.render('problemDetail', { problem, initCode: userCode, failure: 'failure', success: '', results: resultArr });
  } catch (err) {
    console.log('err log', err.message);
    next(err);
  }
}
