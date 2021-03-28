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
      solved_problems: {
        $elemMatch: {
          problem: problem_id
        }
      }
    });

    res.render("problem", {
      problem,
      submittedProblem: currentUser.solved_problems[0],
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
    const solvedProblems = user.solved_problems;
    const problem = await Problem.findById(problem_id);
    const tests = problem.tests;
    const testResult = getResultOfCode(tests, code);

    if (solvedProblems.findIndex(obj => obj.problem.toString() === problem_id) === -1) {
      await User.findByIdAndUpdate(user._id, {
        $push: {
          solved_problems: {
            problem: problem_id,
            code,
            isSolved: false
          }
        }
      });
    } else {
      await User.findOneAndUpdate({
        _id: user._id,
        "problems.problem": problem_id
      }, {
        "problems.$.code": code
      });
    }

    if (Array.isArray(testResult.resultList)) {
      const isFailed = testResult.resultList.includes("failure");

      if (isFailed) {
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
        _id: req.user._id,
        "problems.problem": problem_id
      });

      if (!userInfo.problems[0].isSolved) {
        await Problem.findByIdAndUpdate(problem_id, {
          $inc: {
            completed_users: 1
          }
        });
      }

      await User.findOneAndUpdate({
        _id: req.user._id,
        "solved_problems.problem": problem_id
      }, {
        "solved_problems.$.isSolved": true
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
      error: testResult,
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
