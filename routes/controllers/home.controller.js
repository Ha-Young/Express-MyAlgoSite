const Problem = require('../../models/Problem');

exports.getAll = async (req, res, next) => {
  try {
    const problems = await Problem.find();

    res.render('index', { data: problems });
  } catch (e) {
    next(e);
  }
};
