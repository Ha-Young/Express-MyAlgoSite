const createErr = require("http-errors");

module.exports = function adminCheck(req, res, next) {
  console.log(req.user);

  if (!req.user.isAdmin) {
    next(createErr(401));
  }

  next();
};
