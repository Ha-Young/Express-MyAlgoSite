const mongoose = require('mongoose');

const User = require('../../models/User');
const Problem = require('../../models/Problem');

const errors = require('../../lib/error');
const runTest = require('../../lib/runTest');

exports.renderProblem = async (req, res, next) => {
  try {
    const { problem_id: problemId } = req.params;
    const problem = await Problem.findOne({ problemId });
    if (!problem) {
      throw new errors.DocumentNotFoundError('Model not found', problemId);
    }

    const defaultTextarea = problem.userInput ? problem.userInput : problem.initialInput;
    res.render('problem', { path: '/problems', problem, textarea: defaultTextarea });
  } catch(err) {
    if (err instanceof errors.DocumentNotFoundError) {
      return next(err);
    }

    if (err instanceof mongoose.Error.CastError) {
      return next(new errors.CastError);
    }

    next(new errors.GeneralError(err.message));
  }
};

exports.checkUserSolution = async (req, res, next) => {
  try {
    const { problem_id: problemId } = req.params;
    const { textarea: userInput } = req.body;
    const { _id: userId } = req.user;

    const currentProblem = await Problem.findOneAndUpdate({ problemId }, { userInput }, { new: true });
    const [ testResult, testLog ] = runTest(userInput, currentProblem.tests);

    if (testResult.isPassed) {
      const currentUser = await User.findById(userId);

      if (currentUser.solved.indexOf(currentProblem._id) === -1) {
        const { solved } = currentUser;
        solved.push(currentProblem._id);
        await currentUser.updateOne({ solved });

        const { completedUsers } = currentProblem;
        completedUsers.push(currentUser._id);
        await currentProblem.updateOne({ completedUsers });
      }
    }

    res.render('testResult', { testResult: testResult.message, testLog });
  } catch(err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      return next(new errors.SaveError(err.message));
    }

    next(new errors.GeneralError(err.message));
  }
};
