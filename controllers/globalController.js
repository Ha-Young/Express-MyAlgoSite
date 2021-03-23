const passport = require("passport");
const problems = require("../models/sample_problems.json");
const { TITLE } = require("../constants/common");

exports.home = (req, res) => {
  res.render("home", { pageTitle: TITLE.HOME, problems });
};

exports.login = (req, res) => {
  res.render("login", { pageTitle: TITLE.LOGIN });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/login");
};

exports.loginGoogle = passport.authenticate("google", { scope: ["profile"] });

exports.loginGoogleCallback =
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/",
  });
