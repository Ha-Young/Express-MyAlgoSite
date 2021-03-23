const { TITLE } = require("./constants/common");

exports.localMiddleware = (req, res, next) => {
  res.locals.siteTitle = TITLE.SITE;

  next();
};

exports.authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }

  res.status(301).redirect('/login');
};

exports.loginedUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(301).redirect("/");
    return;
  }

  next();
}
