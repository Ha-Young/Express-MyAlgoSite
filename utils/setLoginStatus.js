const setLoginStatus = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.loginStatus = "login";
  } else {
    res.locals.loginStatus = "logout";
  }

  next();
};

module.exports = setLoginStatus;
