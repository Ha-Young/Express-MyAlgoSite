const fs = require('fs');
const Problem = require('../models/Problem');
const catchAsync = require('../utils/catchAsync');

const problems = JSON.parse(
  fs.readFileSync(`${__dirname}/../models/sample_problems.json`, 'utf-8')
);

exports.importProblems = catchAsync(async () => {
  await Problem.create(problems);
});

exports.deleteProblems = catchAsync(async () => {
  await Problem.deleteMany();
});
