const createHttpError = require("http-errors");
const passport = require("passport");

exports.login = (req, res) => {
  res.render("login");
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

exports.loginGoogle = (req, res, next) => {
  try {
    return passport.authenticate("google", { scope: ["profile"] });
  } catch (err) {
    next(createHttpError(500));
  }
};

exports.loginGoogleCallback =
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  });
