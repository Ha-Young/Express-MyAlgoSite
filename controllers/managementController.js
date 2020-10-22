const Problem = require('../models/Problem');
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
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});
