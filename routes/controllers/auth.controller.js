const passport = require('passport');
const { VIEWS, ROUTES } = require('../../constants');

exports.redirectLogin = function redirectLogin(req, res, next) {
  res.redirect(ROUTES.REDIRECT_LOGIN);
};

exports.getLogin = function getLogin(req, res, next) {
  try {
    res.status(200).render(VIEWS.LOGIN);
  } catch (error) {
    next(error);
  }
};

exports.getLogout = function getLogout(req, res, next) {
  req.logout();
  req.session.destroy();
  res.redirect(ROUTES.REDIRECT_LOGIN);
};

exports.postLogin = passport.authenticate('github');
exports.getGithubCallback = passport.authenticate('github', {
  successRedirect: ROUTES.HOME,
  failureRedirect: ROUTES.REDIRECT_LOGIN
});
