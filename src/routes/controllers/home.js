const Problem = require("../../models/Problem");

exports.home = async function (req, res, next) {
  try {
    const problems = await Problem.find().lean();

    res.render('pages/index', { user: req.user || {}, problems });
  } catch (err) {
    next(err);
  }
};
