const forwardAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    return next();
  }
  return next();
  res.redirect('/log-in');
};

module.exports = forwardAuthenticated;
