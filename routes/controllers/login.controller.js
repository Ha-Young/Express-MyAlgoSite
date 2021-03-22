const passport = require("passport");

exports.getLogin = (req, res, next) => {
  res.render("login");
};

exports.getAuthWithGoogle = passport.authenticate("google", { scope: ["profile"] });

exports.getAuthCallbackWithGoogle = passport.authenticate("google", { failureRedirect: "/login" });

exports.getSuccessfulAuthWithGoogle = (req, res, next) => {
  debugger;
  res.redirect("/");
};