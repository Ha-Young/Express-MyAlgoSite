const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  // return next();
  return res.redirect("/login");
};

const isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return next();
  }
  // return next();
  return res.redirect("/");
};

module.exports = { isLoggedIn, isNotLoggedIn };
