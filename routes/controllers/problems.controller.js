const Problem = require("../../models/Problem");
const User = require("../../models/User");
const createError = require("http-errors");
const { getResultOfCode } = require("../../util");

exports.getProblems = async (req, res, next) => {
  const { user } = req;

  try {
    const problems = await Problem.find();
    res.render("index", {
      problems,
      user: {
        nickname: user.nickname,
        side: user.side
      }
    });
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
};

exports.getProblem = async (req, res, next) => {
  const { problem_id } = req.params;
  const { user } = req;

  try {
    const problem = await Problem.findById(problem_id);
    const currentUser = await User.findOne({
      _id: user._id,
    }, {
      submitted_problems: {
        $elemMatch: {
          problem: problem_id
        }
      }
    });

    res.render("problem", {
      problem,
      submittedProblem: currentUser.submitted_problems[0],
      user: {
        nickname: user.nickname,
        side: user.side
      }
    });
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
};

exports.saveProblem = async (req, res, next) => {
  const { problem_id } = req.params;
  const { user } = req;
  const { code } = req.body;

  try {
    const submittedProblems = user.submitted_problems;
    const problem = await Problem.findById(problem_id);
    const tests = problem.tests;
    const testResult = getResultOfCode(tests, code);
    const isSubmitted = submittedProblems.find(obj => obj.problem.toString() === problem_id);

    if (isSubmitted) {
      await User.findOneAndUpdate({
        _id: user._id,
        "submitted_problems.problem": problem_id
      }, {
        "submitted_problems.$.code": code
      });
    } else {
      await User.findByIdAndUpdate(user._id, {
        $push: {
          submitted_problems: {
            problem: problem_id,
            code,
            isSolved: false
          }
        }
      });
    }

    if (testResult.resultList) {
      if (testResult.failureCount > 0) {
        res.render("solutionResult", {
          id: problem_id,
          code,
          tests,
          resultList: testResult.resultList,
          answerList: testResult.answerList,
          user: {
            nickname: user.nickname,
            side: user.side
          }
        });
        return;
      }

      const userInfo = await User.findOne({
        _id: user._id,
        "submitted_problems.problem": problem_id
      });

      if (!userInfo.submitted_problems[0].isSolved) {
        await Problem.findByIdAndUpdate(problem_id, {
          $push: {
            completed_users: user._id
          }
        });
      }

      await User.findOneAndUpdate({
        _id: user._id,
        "submitted_problems.problem": problem_id
      }, {
        "submitted_problems.$.isSolved": true
      });

      res.render("success", {
        message: "SUCCESS",
        user: {
          nickname: user.nickname,
          side: user.side
        }
      });

      return;
    }

    res.render("solutionResult", {
      id: problem_id,
      code,
      resultList: null,
      answerList: null,
      error: testResult.err,
      user: {
        nickname: user.nickname,
        side: user.side
      }
    });
  } catch(err) {
    console.log(err);
    next(createError(500, "Internal Server Error"));
  }
};
