const forwardAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user.provider === "github" ?
                      req.user.displayName : req.user.username;
    return next();
  }
  res.redirect('/sign-in');
};

module.exports = forwardAuthenticated;
