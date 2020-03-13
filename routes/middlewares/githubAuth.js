const passport = require('passport');
const errors = require('../../lib/error');

module.exports = onGithubPassportAuth = (req, res, next) => {
  passport.authenticate('github', (err, user) => {
    if (err) {
      return next(new errors.InvalidUserInfoError(err.message));
    }

    if (!user) {
      return res.redirect('/login');
    }

    req.login(user, (err) => {
      if (err) {
        return next(new errors.LoginError(err.message));
      }
    });

    next();
  })(req, res, next);
};
