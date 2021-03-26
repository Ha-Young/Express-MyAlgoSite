const vm = require("vm");
const User = require("../models/User");
const Problem = require("../models/Problem");
const { getArrayParamString, getObjectParamString } = require("../utils/utils");

module.exports.problemDetailController = async function problemDetailController(req, res, next) {
  const problemId = req.params.problem_id;

  if (!problemId.match(/^[0-9a-fA-F]{24}$/)) {
    return next();
  }

  const problem = await Problem.findById(problemId);
  if (!problem) {
    return res.redirect("/");
  }

  const initCode = `function solution(${problem.params}) {\n\n}`;
  res.render("problemDetail",{ problem, initCode, failure: "", success: "", results: [], user: req.user });
}

module.exports.postProblemDetailController = async function postProblemDetailController(req, res, next) {
  const {
    body: { userCode },
    params: { problem_id }
  } = req;

  try {
    const problem = await Problem.findById(problem_id);
    let isSuccess = true;
    let isError = false;

    const resultArr = problem.testCases.map((el, i) => {
      try {
        if (isError) return;

        let param = el.testCase;
        if (Array.isArray(param)) {
          param = getArrayParamString(param);
        } else if (typeof param === "object") {
          param = getObjectParamString(param);
        }

        const context = userCode.concat(`\nsolution(${param})`);
        const result = vm.runInNewContext(context);
        if (el.answer === result) {
          return { index: i, message: "Success!" };
        }

        isSuccess = false;
        return { index: i, message: "Fail...!" };
      } catch (err) {
        isError = true;
        return res.render("problemDetail", { problem, initCode: userCode, failure: "failure", success: "", results: err, err, user: req.user });
      }
    });

    if (isError) return;

    if (isSuccess) {
      const currentUser = await User.findById(req.user._id);
      const newWinnerArr = [...problem.winner];
      newWinnerArr.push(currentUser._id);
      await Problem.findByIdAndUpdate(problem_id, { $set : { winner: newWinnerArr }});
      return res.render("problemDetail", { problem, initCode: userCode, failure: "", success: "success", results: resultArr, user: req.user });
    }

    res.render("problemDetail", { problem, initCode: userCode, failure: "failure", success: "", results: resultArr, user: req.user });
  } catch (err) {
    next(err);
  }
}
