const ROUTES = require('../../constants').ROUTES;

exports.verifyUser = function (req, res, next) {
  if (req.user) {
    return next();
  }
  res.redirect(ROUTES.REDIRECT_LOGIN);
};
