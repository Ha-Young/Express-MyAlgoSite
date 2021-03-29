const createErr = require("http-errors");

module.exports = function adminCheck(req, res, next) {
  if (!req.user.isAdmin) {
    next(createErr(401));
  }

  next();
};
