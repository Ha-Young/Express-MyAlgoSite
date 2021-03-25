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

exports.dbCheck = dbCheck;
exports.deleteAllProblems = deleteAllProblems;
