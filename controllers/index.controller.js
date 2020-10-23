const Problem = require('../models/Problem');

exports.getAllProblems = async (req, res, next) => {
  try {
    const initialProblems = await Problem.find({});
    res.render('index', { initialProblems });
  } catch (error) {
    next(error);
  }
};

exports.logIn = (req, res, next) => {
  res.render('login');
};

exports.logOut = async (req, res, next) => {
  if (req.session) {
    try {
      await req.session.destroy();
    } catch (error) {
      next(error);
    }
  }

  req.logout();
  res.redirect('/login');
};
