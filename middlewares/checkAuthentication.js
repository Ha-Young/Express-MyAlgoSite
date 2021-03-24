const AppError = require('../utils/appError');
/**
 * if user is not logged in, then send error with 403
 * @returns {AppError} AppError with message and status 403
 */
const checkAuthentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return next(new AppError('NO permission to view this page', 403));
}

module.exports = checkAuthentication;
