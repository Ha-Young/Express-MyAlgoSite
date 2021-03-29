const Problem = require("../../models/Problem");

exports.viewFilteredLevel = async function (req, res, next) {
  const { level_grade: levelGrade } = req.params;

  try {
    const problems = await Problem.find({ difficulty_level: levelGrade }).lean();

    res.render('pages/index', { user: req.user || {}, problems });

  } catch (err) {
    next(err);
  }
};
