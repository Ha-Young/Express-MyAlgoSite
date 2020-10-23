const Problem = require('../models/Problem');
const apiSampleProblems = require('../utils/apiSampleProblems');
const catchAsync = require('../utils/catchAsync');

exports.getStats = catchAsync(async (req, res, next) => {
  const stats = await Problem.aggregate([
    {
      $group: {
        _id: null,
        numProblems: { $sum: 1 },
        avgDifficulty: { $avg: '$difficulty_level' },
        avgCompletedUsers: { $avg: '$completed_users' },
        easiestLevel: { $min: '$difficulty_level' },
        hardiestLevel: { $max: '$difficulty_level' },
      },
    },
  ]);
  
  res.render('management', {stats: stats[0]})
});

exports.intializeProblems = catchAsync(async (req, res, next) => {
  await apiSampleProblems.deleteProblems(); 
  await apiSampleProblems.importProblems(); //code 11000 / kind required

  res.render('init');

});