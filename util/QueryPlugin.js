const Problem = require('../models/Problem');
const mockProblems = require('../models/sample_problems.json');
const User = require('../models/User');

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
    if (err) console.log(err.message);
  });
};

const getTestCaseById = async (problemId) => {
  return await Problem.findOne({ id: problemId })
    .exec()
    .then(problem => {
      return problem.tests.map(test => {
        const { code, solution } = test;
        const startIndex = code.indexOf('(');
        const endIndex = code.indexOf(')');
        const testArguments = code.slice(startIndex + 1, endIndex).split(',');

        return {
          arguments: testArguments,
          solution
        };
      });
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
    console.log(err.message);
  }
};

exports.dbCheck = dbCheck;
exports.deleteAllProblems = deleteAllProblems;
exports.getTestCaseById = getTestCaseById;
exports.updateCompletedUser = updateCompletedUser;
