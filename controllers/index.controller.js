const Problem = require('../routes/models/Problem');

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find();
    res.render('index', {
      user: req.user,
      problems: problems
    });
  } catch (err) {
    next(err);
  }}
