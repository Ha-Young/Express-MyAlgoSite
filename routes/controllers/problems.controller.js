const Problem = require("../../models/Problem");
const User = require("../../models/User");
const createError = require("http-errors");
const checkSolution = reqruie("../../util");

exports.getProblems = async (req, res, next) => {
  const currentUser = req.user;

  try {
    const problems = await Problem.find();
    res.render("index", {
      problems,
      user: {
        nickname: currentUser.nickname,
        side: currentUser.side
      }
    });
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
};

exports.getProblem = async (req, res, next) => {
  const problemId = req.params.problem_id;
  const currentUser = req.user;

  try {
    const problem = await Problem.findById(problemId);
    const user = await User.findOne({
      _id: currentUser._id,
    }, {
      problems: {
        $elemMatch: {
          problem: problemId
        }
      }
    });

    res.render("problem", {
      problem,
      submittedProblem: user.problems[0],
      user: {
        nickname: currentUser.nickname,
        side: currentUser.side
      }
    });
  } catch (err) {
    next(createError(500, "Internal Server Error"));
  }
};

exports.saveProblem = async (req, res, next) => {
  const problemId = req.params.problem_id;
  const currentUser = req.user;
  const code = req.body.code;

  try {
    const solvedProblems = currentUser.problems;
    const problem = await Problem.findById(problemId);
    const tests = problem.tests;
    const result = checkSolution(tests, code);

    if (solvedProblems.findIndex(obj => obj.problem.toString() === problemId) === -1) {
      await User.findByIdAndUpdate(currentUser._id, {
        $push: {
          solved_problems: {
            problem: problemId,
            code,
            isSolved: false
          }
        }
      });
    } else {
      await User.findOneAndUpdate({
        _id: currentUser._id,
        "problems.problem": problemId
      }, {
        "problems.$.code": code
      });
    }

    if (Array.isArray(result.resultList)) {
      const isFailed = result.resultList.includes("failure");

      if (isFailed) {
        res.render("solutionResult", {
          id: problemId,
          code,
          tests,
          resultList: result.resultList,
          answerList: result.answerList,
          user: {
            nickname: currentUser.nickname,
            side: currentUser.side
          }
        });
        return;
      }

      const userInfo = await User.findOne({
        _id: req.user._id,
        "problems.problem": problemId
      });

      if (!userInfo.problems[0].isSolved) {
        await Problem.findByIdAndUpdate(problemId, {
          $inc: {
            completed_users: 1
          }
        });
      }

      await User.findOneAndUpdate({
        _id: req.user._id,
        "solved_problems.problem": problemId
      }, {
        "solved_problems.$.isSolved": true
      });

      res.render("success", {
        message: "SUCCESS",
        user: {
          nickname: currentUser.nickname,
          side: currentUser.side
        }
      });

      return;
    }

    res.render("solutionResult", {
      id: problemId,
      code,
      resultList: null,
      answerList: null,
      error: result,
      user: {
        nickname: currentUser.nickname,
        side: currentUser.side
      }
    });
  } catch(err) {
    next(createError(500, "Internal Server Error"));
  }
};
