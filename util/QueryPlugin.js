const Problem = require('../models/Problem');
const User = require('../models/User');
const mockProblems = require('../models/sample_problems.json');

const dbCheck = async () => {
  await Problem.find({})
    .exec((err, data) => {
      if (err) return next(err.message);

      if (!data.length) storeMockProblems();
    });
};

const storeMockProblems = async () => {
  for (let i = 0; i < mockProblems.length; i++) {
    await new Problem(mockProblems[i]).save();
  }
};

const deleteAllProblems = async () => {
  await Problem.deleteMany({}, (err) => {
    if (err) throw new Error(err.message);
  });
};

const getTestCaseById = async (problemId) => {
  return await Problem.findOne({ id: problemId })
    .exec()
    .then(problem => {
      return problem.tests;
    });
};

const updateCompletedUser = async (problemId, userId) => {
  try {
    await Problem.findOneAndUpdate({ id: problemId },
      { $addToSet: { completed_users: userId }},
    );
    await User.findOneAndUpdate({ _id: userId },
      { $addToSet: { completed_problems: problemId }},
    );
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.dbCheck = dbCheck;
exports.deleteAllProblems = deleteAllProblems;
exports.getTestCaseById = getTestCaseById;
exports.updateCompletedUser = updateCompletedUser;
