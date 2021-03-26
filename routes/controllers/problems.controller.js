const Problem = require("../../models/Problem");

const { checkUserCode, checkIsFirstComplete } = require("../../services/problemService");

const { PAGE, TITLE, MESSAGE } = require("../../constants/constants");

exports.getAllProblems = async (req, res, next) => {
  try {
    const {
      user,
      params: { difficulty_level },
    } = req;
    
    const problems = await Problem.find(
      difficulty_level && { difficulty_level }
    ).lean();    

    res.render(PAGE.INDEX, { title: TITLE.CODEWARS, problems, user });
  } catch (error) {
    next(error);
  }
};

exports.getProblem = async (req, res, next) => {
  try {
    const {
      params: { problem_id: problemId },
      user,
    } = req;
    const problem = await Problem.findById(problemId);

    res.render(PAGE.PROBLEM, { problem, user });
  } catch (error) {
    next(error);
  }
};

exports.postSolution = async (req, res, next) => {
  try {
    const {
      params: { problem_id: problemId },
      body: {
        solution: [userCode, testCode],
      },
      user,
    } = req;
    
    const problem = await Problem.findById(problemId);

    const { isPassed, resultLog, isCodeError } = checkUserCode(
      problem.tests,
      userCode,
      testCode,
    );

    if (isCodeError || !isPassed) {
      res
        .render(PAGE.FAILURE, {
          message: MESSAGE.FAILURE,
          isCodeError,
          userCode,
          user,
          problem,
          resultLog,
        });

      return;
    }

    const newProblem = checkIsFirstComplete(problem, user.username);

    if (newProblem) {
      await problem.save();
    }

    res
      .render(PAGE.SUCCESS, {
        message: MESSAGE.SUCCESS,
        resultLog,
        userCode,
        user,
        problem,
      });
  } catch (error) {
    next(error);
  }
};
