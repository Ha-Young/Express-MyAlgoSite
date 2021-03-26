const validateLoginStatus = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.loginStatus = "login";
    return next();
  }

  res.locals.loginStatus = "logout";
  res.status(200).redirect("/");
};

module.exports = validateLoginStatus;
