const forwardAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user.username;
    return next();
  }
  res.redirect('/sign-in');
};

module.exports = forwardAuthenticated;
