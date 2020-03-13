const Problem = require('../../models/Problem');
const errors = require('../../lib/error');

exports.renderProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find().lean();

    res.render('index', { path: '/', problems });
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};

exports.logout = async (req, res, next) => {
  await req.logout();
  await req.session.destroy();
  await res.clearCookie('connect.sid');

  res.redirect('/login');
};
