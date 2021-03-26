const Problem = require("../models/Problem");
const User = require("../models/User");
const mongoose = require("mongoose");
const createError = require("http-errors");
const vm = require("vm");

exports.fetchAllProblems = async function(req, res, next) {
  try {
    const problems = await Problem.find().lean();
    const { displayName } = req.user;

    res.render("index", { title: "Codewars", problems, displayName });
    //res.render("index", { layout: "./layouts/index_layout", title: "Codewars", displayName, problems });
  } catch (err) {
    next(createError(500, "failed fetching problems from db"));
  }
}

exports.getSelectedProblem = async function(req, res, next) {
  try {
    const { user: { displayName }, params: { problemId } } = req;
    const selectedProblem = await Problem.findOne({ problemId });

    res.render("problem", { title: "problem", selectedProblem, displayName });

  } catch(err) {
    next(createError(500), "failed to fetch probelm from db");
  }
}

exports.getUsersSolutions = async function(req, res, next) {
  const { params: { problemId } } = req
  console.log(req.params, "!!!!!!!")
  res.render("solutions")
}



exports.postSelectedProblemSolution = async function(req, res, next) {
  try {
    const {
      user: { displayName, solvedProblem },
      body: { codemirrorText },
      params: { problemId }
    } = req;
    const { _id, testcases } = await Problem.findOne({ problemId });

    if (!_id) {
      next(createError(500, "failed to get selectedProblem from db"));
      return;
    }

    const {
      totalTestcaseResult,
      isAllPassed,
    } = getTestcaseResultsFromUserCode(testcases, codemirrorText);

    const isDuplicatedProblem = req.user.solvedProblem.findIndex(
      problem => String(problem.solvedProblemObjectId) === String(_id)) === -1
      ? false
      : true;

    if (!isAllPassed) {
      const passedCaseLength = totalTestcaseResult.filter(testcase => testcase.isPassed).length;
      res.render("failure", { title: "failure", totalTestcaseResult, passedCaseLength, displayName });
      return;
    }

    if (isAllPassed) {
      if(!isDuplicatedProblem) {
        await User.findByIdAndUpdate(
          { _id: req.user._id },
          { $push: { solvedProblem: { solvedProblemObjectId: _id, userCode: codemirrorText}}}
        );
        await Problem.findByIdAndUpdate(
          { _id: _id }, { $push: { completedUsers: req.user._id }}
        );
      }

      await User.findOneAndUpdate(
        { "solvedProblem.solvedProblemObjectId": _id },
        { "solvedProblem.$.userCode": codemirrorText }
      );

      res.render("success", { title: "success", totalTestcaseResult, problemId, displayName });
    }
  } catch (err) {
    next(createError(500, "failed to post selectedProblem"));
  }
}

const getTestcaseResultsFromUserCode = function(testcases, codemirrorText) {
  const totalTestcaseResult = [];

  testcases.forEach((testcase, idx) => {
    const testcaseResultFormat = {
      testIdx: idx,
      testCode: testcase.code,
      testSolution: testcase.solution,
      userSolution: null,
      isPassed: false,
    }

    try {
      const totalRunningCode = codemirrorText + testcase.code;
      const context = vm.createContext();
      const script = new vm.Script(totalRunningCode);
      const result = script.runInContext(context, { timeout: 3000 });

      testcaseResultFormat.userSolution = result;

      console.log(testcaseResultFormat.userSolution, "????")

      if (result === testcase.solution) {
        testcaseResultFormat.isPassed = true;
      }
    } catch (err) {
      testcaseResultFormat.userSolution = err;
    }
    totalTestcaseResult.push(testcaseResultFormat);
    }
  );

  const isAllPassed = totalTestcaseResult.every((testcase, idx) => testcase.isPassed === true);
  return { totalTestcaseResult, isAllPassed };
}
