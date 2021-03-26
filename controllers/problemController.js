const createError = require("http-errors");
const Problem = require("../models/Problem");
const User = require("../models/User");
const {
  runCodemirrorCode,
  determinePassStatus,
  checkAllTestcasePassed,
  isDuplicatedProblem
} = require("../services/problem");

exports.getAllProblems = async function(req, res, next) {
  try {
    const problems = await Problem.find().lean();
    const { displayName } = req.user;

    res.render("index", { title: "Codewars", problems, displayName });
  } catch (err) {
    next(createError(500, "failed to fetch problems from db"));
  }
};

exports.getSelectedProblem = async function(req, res, next) {
  try {
    const { user: { displayName }, params: { problemId } } = req;
    const selectedProblem = await Problem.findOne({ problemId });

    res.render("problem", { title: "problem", selectedProblem, displayName });
  } catch(err) {
    next(createError(500), "failed to fetch probelm from db");
  }
}

exports.postSelectedProblemSolution = async function(req, res, next) {
  try {
    const {
      user: { displayName },
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

    if (!isAllPassed) {
      const passedCaseLength = totalTestcaseResult.filter(testcase => testcase.isPassed).length;
      res.render("failure", { title: "failure", totalTestcaseResult, passedCaseLength, displayName });
      return;
    }

    if (!isDuplicatedProblem(req.user.solvedProblems, _id)) {
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { solvedProblems: { solvedProblemObjectId: _id, userCode: codemirrorText }}}
      );
      await Problem.findByIdAndUpdate(
        { _id: _id }, { $push: { completedUsers: req.user._id }}
      );
    }

    await User.findOneAndUpdate(
      { "solvedProblems.solvedProblemObjectId": _id },
      { "solvedProblems.$.userCode": codemirrorText }
    );

    res.render("success", { title: "success", totalTestcaseResult, problemId, displayName });
  } catch (err) {
    next(createError(500, "failed to post selectedProblem"));
  }
};

const getTestcaseResultsFromUserCode = function(testcases, codemirrorText) {
  const totalTestcaseResult = [];

  testcases.forEach((testcase, idx) => {
    const testcaseResultFormat = {
      testIdx: idx,
      testCode: testcase.code,
      testSolution: testcase.solution,
      userSolution: null,
      isPassed: false,
    };

    const codeRunningResult = runCodemirrorCode(codemirrorText, testcase.code);
    testcaseResultFormat.userSolution = codeRunningResult;

    const isPassed = determinePassStatus(codeRunningResult, testcase.solution);
    testcaseResultFormat.isPassed = isPassed;

    totalTestcaseResult.push(testcaseResultFormat);
  });

  const isAllPassed = checkAllTestcasePassed(totalTestcaseResult);

  return { totalTestcaseResult, isAllPassed };
};
