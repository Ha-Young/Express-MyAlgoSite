const ROUTES = require('../../constants').ROUTES;

exports.verifyUser = function (req, res, next) {
  try {
    if (req.user) return next();
    res.redirect(ROUTES.REDIRECT_LOGIN);
  } catch (error) {
    next(error);
  }
};
