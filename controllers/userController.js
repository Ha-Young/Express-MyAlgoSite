const passport = require("passport");

exports.login = (req, res) => {
  res.render("login");
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
