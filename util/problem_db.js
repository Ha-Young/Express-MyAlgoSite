const Problem = require('../models/Problem');
const mockProblems = require('../models/sample_problems.json');

const dbCheck = async () => {
  Problem.find({})
    .exec((err, data) => {
      if (err) return next(err.message);

      if (!data.length) {
        storeMockProblems();
      }
    });
};

const storeMockProblems = async () => {
  for (let i = 0; i < mockProblems.length; i++) {
    await new Problem(mockProblems[i]).save();
  }
};

const deleteAllProblems = async () => {
  await Problem.deleteMany({}, (err) => {
    if (err) return next(err.message);
  });
};

const getTestCaseById = async (problemId) => {
  return await Problem.findOne({ id: problemId })
    .exec()
    .then(data => {
      return data.tests.map(test => {
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
}

const updateCompletedUser = async (id) => {
  await Problem.findById()
}

exports.dbCheck = dbCheck;
exports.deleteAllProblems = deleteAllProblems;
exports.getTestCaseById = getTestCaseById;
