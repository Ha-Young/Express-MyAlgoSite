module.exports = function (req, res, next) {
  res.locals.isAuthenticated = true;
  res.locals.username = req.user[0].username;

  return next();
};
